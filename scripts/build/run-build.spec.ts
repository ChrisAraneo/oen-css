import { beforeEach, describe, expect, it, vi } from 'vitest';
import { computeBuildArtifacts } from './compute-build-artifacts.ts';
import { readBuildInputs } from './internal/read-build-inputs.ts';
import { writeBuildArtifacts } from './internal/write-build-artifacts.ts';
import { writeBuildReport } from './internal/write-build-report.ts';
import { runBuild } from './run-build.ts';
import type { BuildArtifacts } from './types/build-artifacts.ts';
import type { BuildInputs } from './types/build-inputs.ts';

vi.mock('./compute-build-artifacts.ts', () => ({
  computeBuildArtifacts: vi.fn(),
}));
vi.mock('./internal/read-build-inputs.ts', () => ({
  readBuildInputs: vi.fn(),
}));
vi.mock('./internal/write-build-artifacts.ts', () => ({
  writeBuildArtifacts: vi.fn(),
}));
vi.mock('./internal/write-build-report.ts', () => ({
  writeBuildReport: vi.fn(),
}));

const INPUTS = { version: '0.2.1' } as BuildInputs;

const ARTIFACTS = { version: '0.2.1' } as BuildArtifacts;

const now = () => 0;

describe('runBuild', () => {
  beforeEach(() => {
    vi.mocked(readBuildInputs).mockResolvedValue(INPUTS);
    vi.mocked(computeBuildArtifacts).mockReturnValue(ARTIFACTS);
    vi.mocked(writeBuildArtifacts).mockResolvedValue(ARTIFACTS);
    vi.mocked(writeBuildReport).mockReturnValue(true);
  });

  it('should call every build stage with the result of the stage before when the build runs', async () => {
    await runBuild(now);

    expect(readBuildInputs).toHaveBeenCalledWith(now);
    expect(computeBuildArtifacts).toHaveBeenCalledWith(INPUTS);
    expect(writeBuildArtifacts).toHaveBeenCalledWith(ARTIFACTS);
    expect(writeBuildReport).toHaveBeenCalledWith(ARTIFACTS, now);
  });

  it('should resolve with `true` when the report says the build succeeded', async () => {
    await expect(runBuild(now)).resolves.toBe(true);
  });

  it('should resolve with `false` when the report says the build failed', async () => {
    vi.mocked(writeBuildReport).mockReturnValue(false);

    await expect(runBuild(now)).resolves.toBe(false);
  });

  it('should pass the clock to the inputs and the report when the build runs', async () => {
    const clock = () => 42;
    await runBuild(clock);

    expect(readBuildInputs).toHaveBeenCalledWith(clock);
    expect(writeBuildReport).toHaveBeenCalledWith(expect.anything(), clock);
  });

  it('should reject with the read error when reading the inputs fails', async () => {
    vi.mocked(readBuildInputs).mockRejectedValue(new Error('ENOENT'));

    await expect(runBuild(now)).rejects.toThrow('ENOENT');
  });
});

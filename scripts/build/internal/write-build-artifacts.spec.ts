import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import { writeBuildArtifacts } from './write-build-artifacts.ts';
import { writeEveryBuildArtifact } from './write-every-build-artifact.ts';

vi.mock('./write-every-build-artifact.ts', () => ({
  writeEveryBuildArtifact: vi.fn(),
}));

const artifacts = (issues: readonly string[] = []): BuildArtifacts => ({
  version: '0.2.1',
  bulmaVersion: '1.0.4',
  startedAt: 0,
  stylesheet: 'body {}',
  minifiedStylesheet: 'body{}',
  oenLicense: 'MIT',
  bulmaLicense: 'MIT',
  thirdPartyNotices: '# Notices',
  appliedMappings: [],
  embeddedLicenseComments: [],
  warnings: [],
  issues,
});

describe('writeBuildArtifacts', () => {
  beforeEach(() => {
    vi.mocked(writeEveryBuildArtifact).mockImplementation((given) =>
      Promise.resolve(given),
    );
  });

  it('should call `writeEveryBuildArtifact` with the artifacts when the build had no issue', async () => {
    const clean = artifacts();
    await writeBuildArtifacts(clean);

    expect(writeEveryBuildArtifact).toHaveBeenCalledWith(clean);
  });

  it('should not call `writeEveryBuildArtifact` when the build had an issue', async () => {
    await writeBuildArtifacts(artifacts(['leaked identifier']));

    expect(writeEveryBuildArtifact).not.toHaveBeenCalled();
  });

  it('should resolve with the artifacts when the build had an issue', async () => {
    const failed = artifacts(['leaked identifier']);

    await expect(writeBuildArtifacts(failed)).resolves.toBe(failed);
  });

  it('should resolve with the artifacts when the build had no issue', async () => {
    const clean = artifacts();

    await expect(writeBuildArtifacts(clean)).resolves.toBe(clean);
  });
});

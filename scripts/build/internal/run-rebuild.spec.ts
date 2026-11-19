import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runProcess } from '../../common/run-process.ts';
import { BUILD_CLI, NO_BUILD_ARGUMENTS } from '../consts.ts';
import { runRebuild } from './run-rebuild.ts';
import { writeRebuildNotice } from './write-rebuild-notice.ts';

vi.mock('../../common/run-process.ts', () => ({ runProcess: vi.fn() }));
vi.mock('./write-rebuild-notice.ts', () => ({ writeRebuildNotice: vi.fn() }));

describe('runRebuild', () => {
  beforeEach(() => {
    vi.mocked(runProcess).mockResolvedValue(true);
  });

  it('should call `runProcess` with the build CLI and the build arguments when the rebuild runs', async () => {
    await runRebuild();

    expect(runProcess).toHaveBeenCalledWith(BUILD_CLI, NO_BUILD_ARGUMENTS);
  });

  it('should call `writeRebuildNotice` once when the rebuild runs', async () => {
    await runRebuild();

    expect(writeRebuildNotice).toHaveBeenCalledTimes(1);
  });

  it('should resolve with `true` when the build process succeeds', async () => {
    await expect(runRebuild()).resolves.toBe(true);
  });

  it('should resolve with `false` when the build process fails', async () => {
    vi.mocked(runProcess).mockResolvedValue(false);

    await expect(runRebuild()).resolves.toBe(false);
  });

  it('should call `runProcess` with an empty argument array when the rebuild runs', async () => {
    await runRebuild();

    expect(runProcess).toHaveBeenCalledWith(expect.any(String), []);
  });
});

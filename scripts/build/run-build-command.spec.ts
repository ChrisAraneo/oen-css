import { beforeEach, describe, expect, it, vi } from 'vitest';
import { patchExitCodeOnFailure } from '../common/patch-exit-code-on-failure.ts';
import { startRebuildWatch } from './internal/start-rebuild-watch.ts';
import { runBuild } from './run-build.ts';
import { runBuildCommand } from './run-build-command.ts';

vi.mock('./run-build.ts', () => ({ runBuild: vi.fn() }));
vi.mock('./internal/start-rebuild-watch.ts', () => ({
  startRebuildWatch: vi.fn(),
}));
vi.mock('../common/patch-exit-code-on-failure.ts', () => ({
  patchExitCodeOnFailure: vi.fn(),
}));

const now = () => 0;

describe('runBuildCommand', () => {
  beforeEach(() => {
    vi.mocked(runBuild).mockResolvedValue(true);
  });

  it('should call `runBuild` with the clock when called with no flag', async () => {
    await runBuildCommand([], now);

    expect(runBuild).toHaveBeenCalledWith(now);
  });

  it('should call `startRebuildWatch` once when called with `--watch`', async () => {
    await runBuildCommand(['--watch'], now);

    expect(startRebuildWatch).toHaveBeenCalledTimes(1);
  });

  it('should not call `patchExitCodeOnFailure` when the build fails under `--watch`', async () => {
    vi.mocked(runBuild).mockResolvedValue(false);
    await runBuildCommand(['--watch'], now);

    expect(patchExitCodeOnFailure).not.toHaveBeenCalled();
  });

  it('should pass `false` to `patchExitCodeOnFailure` when the build fails with no flag', async () => {
    vi.mocked(runBuild).mockResolvedValue(false);
    await runBuildCommand([], now);

    expect(patchExitCodeOnFailure).toHaveBeenCalledWith(false);
  });

  it('should pass `true` to `patchExitCodeOnFailure` when the build succeeds with no flag', async () => {
    await runBuildCommand([], now);

    expect(patchExitCodeOnFailure).toHaveBeenCalledWith(true);
  });

  it('should not call `startRebuildWatch` when called with no flag', async () => {
    await runBuildCommand([], now);

    expect(startRebuildWatch).not.toHaveBeenCalled();
  });
});

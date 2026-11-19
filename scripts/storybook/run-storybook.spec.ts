import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runProcess } from '../common/run-process.ts';
import { BUILD_ARGUMENTS, DEV_ARGUMENTS, STORYBOOK_CLI } from './consts.ts';
import { runVerifiedBuild } from './internal/run-verified-build.ts';
import { runStorybook } from './run-storybook.ts';

vi.mock('./internal/run-verified-build.ts', () => ({
  runVerifiedBuild: vi.fn(),
}));
vi.mock('../common/run-process.ts', () => ({ runProcess: vi.fn() }));

const now = () => 0;

describe('runStorybook', () => {
  beforeEach(() => {
    vi.mocked(runVerifiedBuild).mockResolvedValue(true);
    vi.mocked(runProcess).mockResolvedValue(true);
  });

  it('should pass the clock to `runVerifiedBuild` when Storybook runs', async () => {
    await runStorybook(false, now);

    expect(runVerifiedBuild).toHaveBeenCalledWith(now);
  });

  it('should call `runProcess` with the dev arguments when called with `false`', async () => {
    await runStorybook(false, now);

    expect(runProcess).toHaveBeenCalledWith(STORYBOOK_CLI, DEV_ARGUMENTS);
  });

  it('should call `runProcess` with the build arguments when called with `true`', async () => {
    await runStorybook(true, now);

    expect(runProcess).toHaveBeenCalledWith(STORYBOOK_CLI, BUILD_ARGUMENTS);
  });

  it('should not call `runProcess` when the verified build failed', async () => {
    vi.mocked(runVerifiedBuild).mockResolvedValue(false);

    await expect(runStorybook(false, now)).resolves.toBe(false);
    expect(runProcess).not.toHaveBeenCalled();
  });

  it('should resolve with `false` when Storybook fails', async () => {
    vi.mocked(runProcess).mockResolvedValue(false);

    await expect(runStorybook(true, now)).resolves.toBe(false);
  });
});

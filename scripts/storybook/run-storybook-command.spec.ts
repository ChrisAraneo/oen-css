import { beforeEach, describe, expect, it, vi } from 'vitest';
import { patchExitCodeOnFailure } from '../common/patch-exit-code-on-failure.ts';
import { runStorybook } from './run-storybook.ts';
import { runStorybookCommand } from './run-storybook-command.ts';

vi.mock('./run-storybook.ts', () => ({ runStorybook: vi.fn() }));
vi.mock('../common/patch-exit-code-on-failure.ts', () => ({
  patchExitCodeOnFailure: vi.fn(),
}));

const now = () => 0;

describe('runStorybookCommand', () => {
  beforeEach(() => {
    vi.mocked(runStorybook).mockResolvedValue(true);
  });

  it('should pass `true` and the clock to `runStorybook` when called with `--build`', async () => {
    await runStorybookCommand(['--build'], now);

    expect(runStorybook).toHaveBeenCalledWith(true, now);
  });

  it('should pass `false` and the clock to `runStorybook` when called with no flag', async () => {
    await runStorybookCommand([], now);

    expect(runStorybook).toHaveBeenCalledWith(false, now);
  });

  it('should pass `true` to `runStorybook` when `--build` is last in the arguments', async () => {
    await runStorybookCommand(['node', 'storybook.ts', '--build'], now);

    expect(runStorybook).toHaveBeenCalledWith(true, now);
  });

  it('should pass `false` to `patchExitCodeOnFailure` when Storybook failed', async () => {
    vi.mocked(runStorybook).mockResolvedValue(false);
    await runStorybookCommand([], now);

    expect(patchExitCodeOnFailure).toHaveBeenCalledWith(false);
  });

  it('should pass `true` to `patchExitCodeOnFailure` when Storybook succeeded', async () => {
    await runStorybookCommand([], now);

    expect(patchExitCodeOnFailure).toHaveBeenCalledWith(true);
  });
});

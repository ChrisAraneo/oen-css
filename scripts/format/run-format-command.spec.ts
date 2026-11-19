import { beforeEach, describe, expect, it, vi } from 'vitest';
import { patchExitCodeOnFailure } from '../common/patch-exit-code-on-failure.ts';
import { runFormat } from './run-format.ts';
import { runFormatCommand } from './run-format-command.ts';

vi.mock('./run-format.ts', () => ({ runFormat: vi.fn() }));
vi.mock('../common/patch-exit-code-on-failure.ts', () => ({
  patchExitCodeOnFailure: vi.fn(),
}));

describe('runFormatCommand', () => {
  beforeEach(() => {
    vi.mocked(runFormat).mockResolvedValue(true);
  });

  it('should pass `true` to `runFormat` when called with `--check`', async () => {
    await runFormatCommand(['--check']);

    expect(runFormat).toHaveBeenCalledWith(true);
  });

  it('should pass `false` to `runFormat` when called with no flag', async () => {
    await runFormatCommand([]);

    expect(runFormat).toHaveBeenCalledWith(false);
  });

  it('should pass `false` to `runFormat` when the arguments name no known flag', async () => {
    await runFormatCommand(['node', 'format.ts', '--other']);

    expect(runFormat).toHaveBeenCalledWith(false);
  });

  it('should pass `true` to `runFormat` when `--check` is last in the arguments', async () => {
    await runFormatCommand(['node', 'format.ts', '--check']);

    expect(runFormat).toHaveBeenCalledWith(true);
  });

  it('should pass `false` to `patchExitCodeOnFailure` when formatting failed', async () => {
    vi.mocked(runFormat).mockResolvedValue(false);
    await runFormatCommand(['--check']);

    expect(patchExitCodeOnFailure).toHaveBeenCalledWith(false);
  });

  it('should pass `true` to `patchExitCodeOnFailure` when formatting succeeded', async () => {
    await runFormatCommand(['--check']);

    expect(patchExitCodeOnFailure).toHaveBeenCalledWith(true);
  });
});

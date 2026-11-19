import { beforeEach, describe, expect, it, vi } from 'vitest';
import { patchExitCodeOnFailure } from '../common/patch-exit-code-on-failure.ts';
import { runVerify } from './run-verify.ts';
import { runVerifyCommand } from './run-verify-command.ts';

vi.mock('./run-verify.ts', () => ({ runVerify: vi.fn() }));
vi.mock('../common/patch-exit-code-on-failure.ts', () => ({
  patchExitCodeOnFailure: vi.fn(),
}));

describe('runVerifyCommand', () => {
  beforeEach(() => {
    vi.mocked(runVerify).mockResolvedValue(true);
  });

  it('should call `runVerify` once when the command runs', async () => {
    await runVerifyCommand();

    expect(runVerify).toHaveBeenCalledTimes(1);
  });

  it('should pass `false` to `patchExitCodeOnFailure` when a check failed', async () => {
    vi.mocked(runVerify).mockResolvedValue(false);
    await runVerifyCommand();

    expect(patchExitCodeOnFailure).toHaveBeenCalledWith(false);
  });

  it('should pass `true` to `patchExitCodeOnFailure` when every check passed', async () => {
    await runVerifyCommand();

    expect(patchExitCodeOnFailure).toHaveBeenCalledWith(true);
  });

  it('should resolve with `undefined` when the command runs', async () => {
    await expect(runVerifyCommand()).resolves.toBe(undefined);
  });
});

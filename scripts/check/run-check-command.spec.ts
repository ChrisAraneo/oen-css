import { beforeEach, describe, expect, it, vi } from 'vitest';
import { patchExitCodeOnFailure } from '../common/patch-exit-code-on-failure.ts';
import { runCheck } from './run-check.ts';
import { runCheckCommand } from './run-check-command.ts';

vi.mock('./run-check.ts', () => ({ runCheck: vi.fn() }));
vi.mock('../common/patch-exit-code-on-failure.ts', () => ({
  patchExitCodeOnFailure: vi.fn(),
}));

const now = () => 0;

describe('runCheckCommand', () => {
  beforeEach(() => {
    vi.mocked(runCheck).mockResolvedValue(true);
  });

  it('should pass the arguments and the clock to `runCheck` when the command runs', async () => {
    await runCheckCommand(['--types'], now);

    expect(runCheck).toHaveBeenCalledWith(['--types'], now);
  });

  it('should pass `false` to `patchExitCodeOnFailure` when a step failed', async () => {
    vi.mocked(runCheck).mockResolvedValue(false);
    await runCheckCommand([], now);

    expect(patchExitCodeOnFailure).toHaveBeenCalledWith(false);
  });

  it('should pass `true` to `patchExitCodeOnFailure` when every step passed', async () => {
    await runCheckCommand([], now);

    expect(patchExitCodeOnFailure).toHaveBeenCalledWith(true);
  });

  it('should call `runCheck` once when the command runs', async () => {
    await runCheckCommand([], now);

    expect(runCheck).toHaveBeenCalledTimes(1);
  });
});

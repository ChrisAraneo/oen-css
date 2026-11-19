import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runEveryStep } from './internal/run-every-step.ts';
import { toCheckSteps } from './internal/to-check-steps.ts';
import type { CheckStep } from './internal/types/check-step.ts';
import { writeCheckReport } from './internal/write-check-report.ts';
import { runCheck } from './run-check.ts';

vi.mock('./internal/run-every-step.ts', () => ({ runEveryStep: vi.fn() }));
vi.mock('./internal/to-check-steps.ts', () => ({ toCheckSteps: vi.fn() }));
vi.mock('./internal/write-check-report.ts', () => ({
  writeCheckReport: vi.fn(),
}));

const run = () => Promise.resolve(true);

const STEPS: readonly CheckStep[] = [
  { name: 'format', flag: '--format', run },
  { name: 'typecheck', flag: '--types', run },
  { name: 'build', flag: '--build', run },
];

const now = () => 0;

describe('runCheck', () => {
  beforeEach(() => {
    vi.mocked(toCheckSteps).mockReturnValue(STEPS);
    vi.mocked(runEveryStep).mockResolvedValue([
      { name: 'format', succeeded: true },
    ]);
    vi.mocked(writeCheckReport).mockReturnValue(true);
  });

  it('should pass every step to `runEveryStep` when no flag is given', async () => {
    await runCheck([], now);

    expect(runEveryStep).toHaveBeenCalledWith(STEPS);
  });

  it('should pass only the selected step to `runEveryStep` when `--types` is given', async () => {
    await runCheck(['--types'], now);

    expect(runEveryStep).toHaveBeenCalledWith([
      { name: 'typecheck', flag: '--types', run },
    ]);
  });

  it('should pass the selected step count to `writeCheckReport` when `--types` is given', async () => {
    await runCheck(['--types'], now);

    expect(writeCheckReport).toHaveBeenCalledWith(expect.anything(), 1);
  });

  it('should pass the full step count to `writeCheckReport` when no flag is given', async () => {
    await runCheck([], now);

    expect(writeCheckReport).toHaveBeenCalledWith(expect.anything(), 3);
  });

  it('should pass the step outcomes to `writeCheckReport` when the check runs', async () => {
    await runCheck([], now);

    expect(writeCheckReport).toHaveBeenCalledWith(
      [{ name: 'format', succeeded: true }],
      expect.any(Number),
    );
  });

  it('should pass the clock to `toCheckSteps` when the check runs', async () => {
    await runCheck([], now);

    expect(toCheckSteps).toHaveBeenCalledWith(now);
  });

  it('should resolve with `false` when the report says a step failed', async () => {
    vi.mocked(writeCheckReport).mockReturnValue(false);

    await expect(runCheck([], now)).resolves.toBe(false);
  });
});

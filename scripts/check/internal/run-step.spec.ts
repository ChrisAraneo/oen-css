import { describe, expect, it, vi } from 'vitest';
import { runStep } from './run-step.ts';
import { writeStepNotice } from './write-step-notice.ts';

vi.mock('./write-step-notice.ts', () => ({ writeStepNotice: vi.fn() }));

describe('runStep', () => {
  it('should resolve with the step name and `succeeded: true` when the step succeeds', async () => {
    await expect(
      runStep({
        name: 'typecheck',
        flag: '--types',
        run: () => Promise.resolve(true),
      }),
    ).resolves.toEqual({ name: 'typecheck', succeeded: true });
  });

  it('should resolve with the step name and `succeeded: false` when the step fails', async () => {
    await expect(
      runStep({
        name: 'build',
        flag: '--build',
        run: () => Promise.resolve(false),
      }),
    ).resolves.toEqual({ name: 'build', succeeded: false });
  });

  it('should call `writeStepNotice` before running the step when the step runs', async () => {
    const order: string[] = [];
    vi.mocked(writeStepNotice).mockImplementation(() => {
      order.push('notice');
    });

    await runStep({
      name: 'format',
      flag: '--format',
      run: () => {
        order.push('run');

        return Promise.resolve(true);
      },
    });

    expect(order).toEqual(['notice', 'run']);
  });

  it('should pass the step name to `writeStepNotice` when the step runs', async () => {
    await runStep({
      name: 'verify',
      flag: '--verify',
      run: () => Promise.resolve(true),
    });

    expect(writeStepNotice).toHaveBeenCalledWith('verify');
  });

  it('should call the step runner once when the step runs', async () => {
    const run = vi.fn(() => Promise.resolve(true));
    await runStep({ name: 'format', flag: '--format', run });

    expect(run).toHaveBeenCalledTimes(1);
  });
});

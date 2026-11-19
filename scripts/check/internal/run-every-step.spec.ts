import { describe, expect, it, vi } from 'vitest';
import { runEveryStep } from './run-every-step.ts';
import type { CheckStep } from './types/check-step.ts';

vi.mock('./write-step-notice.ts', () => ({ writeStepNotice: vi.fn() }));

const step = (name: string, succeeded: boolean): CheckStep => ({
  name,
  flag: `--${name}`,
  run: vi.fn(() => Promise.resolve(succeeded)),
});

describe('runEveryStep', () => {
  it('should resolve with one outcome per step in order when every step succeeds', async () => {
    await expect(
      runEveryStep([step('format', true), step('typecheck', true)]),
    ).resolves.toEqual([
      { name: 'format', succeeded: true },
      { name: 'typecheck', succeeded: true },
    ]);
  });

  it('should not run the later step when an earlier step fails', async () => {
    const later = step('typecheck', true);

    await expect(runEveryStep([step('format', false), later])).resolves.toEqual(
      [{ name: 'format', succeeded: false }],
    );
    expect(later.run).not.toHaveBeenCalled();
  });

  it('should run the steps one after another when called with two steps', async () => {
    const order: string[] = [];
    const tracked = (name: string): CheckStep => ({
      name,
      flag: `--${name}`,
      run: () => {
        order.push(name);

        return Promise.resolve(true);
      },
    });

    await runEveryStep([tracked('first'), tracked('second')]);

    expect(order).toEqual(['first', 'second']);
  });

  it('should resolve with an empty array when there are no steps', async () => {
    await expect(runEveryStep([])).resolves.toEqual([]);
  });

  it('should run the later step when the earlier step succeeds', async () => {
    const later = step('typecheck', true);
    await runEveryStep([step('format', true), later]);

    expect(later.run).toHaveBeenCalledTimes(1);
  });
});

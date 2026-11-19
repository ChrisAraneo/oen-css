import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runStep } from './run-step.ts';
import { toNextOutcomes } from './to-next-outcomes.ts';
import type { CheckStep } from './types/check-step.ts';

vi.mock('./run-step.ts', () => ({ runStep: vi.fn() }));

const STEP: CheckStep = {
  name: 'typecheck',
  flag: '--types',
  run: () => Promise.resolve(true),
};

describe('toNextOutcomes', () => {
  beforeEach(() => {
    vi.mocked(runStep).mockResolvedValue({
      name: 'typecheck',
      succeeded: true,
    });
  });

  it('should resolve with the earlier outcomes and the next one when the earlier step succeeded', async () => {
    await expect(
      toNextOutcomes([{ name: 'format', succeeded: true }], STEP),
    ).resolves.toEqual([
      { name: 'format', succeeded: true },
      { name: 'typecheck', succeeded: true },
    ]);
  });

  it('should pass the step to `runStep` when no step has run yet', async () => {
    await toNextOutcomes([], STEP);

    expect(runStep).toHaveBeenCalledWith(STEP);
  });

  it('should not call `runStep` when an earlier step failed', async () => {
    await toNextOutcomes([{ name: 'format', succeeded: false }], STEP);

    expect(runStep).not.toHaveBeenCalled();
  });

  it('should resolve with the same outcomes when an earlier step failed', async () => {
    const outcomes = [{ name: 'format', succeeded: false }];

    await expect(toNextOutcomes(outcomes, STEP)).resolves.toBe(outcomes);
  });

  it('should resolve with the failed outcome when the step fails', async () => {
    vi.mocked(runStep).mockResolvedValue({
      name: 'typecheck',
      succeeded: false,
    });

    await expect(toNextOutcomes([], STEP)).resolves.toEqual([
      { name: 'typecheck', succeeded: false },
    ]);
  });
});

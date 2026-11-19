import { reduce } from 'lodash-es';
import { toNextOutcomes } from './to-next-outcomes.ts';
import type { CheckOutcome } from './types/check-outcome.ts';
import type { CheckStep } from './types/check-step.ts';

const NOTHING_RUN: readonly CheckOutcome[] = Object.freeze([]);

export const runEveryStep = (
  steps: readonly CheckStep[],
): Promise<readonly CheckOutcome[]> =>
  reduce(
    steps,
    (outcomes, step) =>
      outcomes.then((outcomes) => toNextOutcomes(outcomes, step)),
    Promise.resolve(NOTHING_RUN),
  );

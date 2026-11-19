import { match } from 'ts-pattern';
import { hasFailedStep } from './has-failed-step.ts';
import { runStep } from './run-step.ts';
import type { CheckOutcome } from './types/check-outcome.ts';
import type { CheckStep } from './types/check-step.ts';

export const toNextOutcomes = (
  outcomes: readonly CheckOutcome[],
  step: CheckStep,
): Promise<readonly CheckOutcome[]> =>
  match(hasFailedStep(outcomes))
    .with(true, () => Promise.resolve(outcomes))
    .otherwise(() => runStep(step).then((outcome) => [...outcomes, outcome]));

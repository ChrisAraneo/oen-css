import { filter, includes, isEmpty } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import type { CheckStep } from './types/check-step.ts';

export const filterSelectedSteps = (
  steps: readonly CheckStep[],
  commandArguments: readonly string[],
): readonly CheckStep[] =>
  pipe(
    filter(steps, ({ flag }) => includes(commandArguments, flag)),
    (selected) =>
      match(isEmpty(selected))
        .with(true, () => steps)
        .otherwise(() => selected),
  );

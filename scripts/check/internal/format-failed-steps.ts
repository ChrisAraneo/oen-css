import { filter, isEmpty, join, map } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import type { CheckOutcome } from './types/check-outcome.ts';

const NOTHING_TO_REPORT: readonly string[] = Object.freeze([]);

export const formatFailedSteps = (
  outcomes: readonly CheckOutcome[],
): readonly string[] =>
  pipe(
    filter(outcomes, ({ succeeded }) => !succeeded),
    (failed) =>
      match(isEmpty(failed))
        .with(true, () => NOTHING_TO_REPORT)
        .otherwise(() => [
          `failed: ${join(
            map(failed, ({ name }) => name),
            ', ',
          )}`,
        ]),
  );

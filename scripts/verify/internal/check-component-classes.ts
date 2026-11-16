import { filter, includes, isEmpty, join, size } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { SPOT_CHECKED_BULMA_SELECTORS } from './consts.ts';

const CHECK_NAME = 'component classes are unchanged from Bulma';

const formatMissingSelectorsProblem = (
  missing: readonly string[],
): string | undefined =>
  match(isEmpty(missing))
    .with(true, () => undefined)
    .otherwise(() => `missing selectors: ${join(missing, ', ')}`);

export const checkComponentClasses = ({
  stylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    filter(
      SPOT_CHECKED_BULMA_SELECTORS,
      (selector) => !includes(stylesheet.text, selector),
    ),
    (missing) => ({
      name: CHECK_NAME,
      detail: `${size(SPOT_CHECKED_BULMA_SELECTORS)} spot-checked selectors present`,
      problem: formatMissingSelectorsProblem(missing),
    }),
  );

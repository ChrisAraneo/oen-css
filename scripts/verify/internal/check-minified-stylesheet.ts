import { size } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { countMatches } from '../../common/count-matches.ts';
import { OEN_MINIFIED_STYLESHEET, OEN_STYLESHEET } from '../../dist/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';

const CHECK_NAME = 'minified output is smaller and still intact';
const OPENING_BRACE = /\{/g;
const CLOSING_BRACE = /\}/g;
const WHOLE_PERCENT = 100;
const REDUCTION_DECIMALS = 1;

const formatReduction = (expanded: number, minified: number): string =>
  ((1 - minified / expanded) * WHOLE_PERCENT).toFixed(REDUCTION_DECIMALS);

const formatMinifiedStylesheetProblem = (
  expanded: string,
  minified: string,
): string | undefined =>
  match({
    smaller: size(minified) < size(expanded),
    balanced:
      countMatches(minified, OPENING_BRACE) ===
      countMatches(minified, CLOSING_BRACE),
  })
    .with(
      { smaller: false },
      () => `${OEN_MINIFIED_STYLESHEET} is not smaller than ${OEN_STYLESHEET}`,
    )
    .with(
      { balanced: false },
      () => `${OEN_MINIFIED_STYLESHEET} has unbalanced braces`,
    )
    .otherwise(() => undefined);

export const checkMinifiedStylesheet = ({
  stylesheet,
  minifiedStylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    { expanded: stylesheet.text, minified: minifiedStylesheet.text },
    ({ expanded, minified }) => ({
      name: CHECK_NAME,
      detail: `${formatReduction(size(expanded), size(minified))}% smaller, balanced braces`,
      problem: formatMinifiedStylesheetProblem(expanded, minified),
    }),
  );

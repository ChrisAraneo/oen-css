import { size } from 'lodash-es';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatMinifiedStylesheetIssue } from './format-minified-stylesheet-issue.ts';
import { formatReduction } from './format-reduction.ts';

const CHECK_NAME = 'minified output is smaller and still intact';

export const validateMinifiedStylesheet = ({
  stylesheet,
  minifiedStylesheet,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: `${formatReduction(size(stylesheet.text), size(minifiedStylesheet.text))}% smaller, balanced braces`,
  issue: formatMinifiedStylesheetIssue(
    stylesheet.text,
    minifiedStylesheet.text,
  ),
});

import { size } from 'lodash-es';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { filterMissingDeclarations } from './filter-missing-declarations.ts';
import { formatMissingSelectorsIssue } from './format-missing-selectors-issue.ts';

const CHECK_NAME = 'component classes are unchanged from Bulma';

const SPOT_CHECKED_BULMA_SELECTORS: readonly string[] = Object.freeze([
  '.button',
  '.navbar',
  '.card',
  '.modal',
  '.columns',
  '.fixed-grid',
  '.hero',
  '.tag',
  '.input',
  '.is-primary',
  '.has-text-centered',
  '.skeleton-block',
]);

export const validateComponentClasses = ({
  stylesheet,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: `${size(SPOT_CHECKED_BULMA_SELECTORS)} spot-checked selectors present`,
  issue: formatMissingSelectorsIssue(
    filterMissingDeclarations(stylesheet.text, SPOT_CHECKED_BULMA_SELECTORS),
  ),
});

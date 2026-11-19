import { map, size } from 'lodash-es';
import { OEN_TYPE_DECLARATIONS } from '../../../src/typography/consts.ts';
import { formatThemeTypeDeclaration } from '../../../src/typography/format-theme-type-declaration.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { filterMissingDeclarations } from './filter-missing-declarations.ts';
import { formatMissingDeclarationsIssue } from './format-missing-declarations-issue.ts';

const CHECK_NAME = 'type scale is the configured Oen scale';

export const validateThemeType = ({
  stylesheet,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: `${size(OEN_TYPE_DECLARATIONS)} declarations compile to their configured sizes`,
  issue: formatMissingDeclarationsIssue(
    filterMissingDeclarations(
      stylesheet.text,
      map(OEN_TYPE_DECLARATIONS, formatThemeTypeDeclaration),
    ),
  ),
});

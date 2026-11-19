import { map, size } from 'lodash-es';
import { OEN_THEME_COLORS } from '../../../src/colors/consts.ts';
import { formatThemeColorDeclaration } from '../../../src/colors/format-theme-color-declaration.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { filterMissingDeclarations } from './filter-missing-declarations.ts';
import { formatMissingDeclarationsIssue } from './format-missing-declarations-issue.ts';

const CHECK_NAME = 'theme colors are the configured Oen palette';

export const validateThemeColors = ({
  stylesheet,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: `${size(OEN_THEME_COLORS)} colors compile to their configured values`,
  issue: formatMissingDeclarationsIssue(
    filterMissingDeclarations(
      stylesheet.text,
      map(OEN_THEME_COLORS, formatThemeColorDeclaration),
    ),
  ),
});

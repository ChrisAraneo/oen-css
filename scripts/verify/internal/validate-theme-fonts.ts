import { map, size } from 'lodash-es';
import { OEN_FONT_PROPERTIES } from '../../../src/fonts/consts.ts';
import { formatThemeFontDeclaration } from '../../../src/fonts/format-theme-font-declaration.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { filterMissingDeclarations } from './filter-missing-declarations.ts';
import { formatMissingDeclarationsIssue } from './format-missing-declarations-issue.ts';

const CHECK_NAME = 'theme fonts are the configured Oen stack';

export const validateThemeFonts = ({
  stylesheet,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: `${size(OEN_FONT_PROPERTIES)} properties compile to the configured stack`,
  issue: formatMissingDeclarationsIssue(
    filterMissingDeclarations(
      stylesheet.text,
      map(OEN_FONT_PROPERTIES, formatThemeFontDeclaration),
    ),
  ),
});

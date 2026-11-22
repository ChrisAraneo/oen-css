import { concat, map, size } from 'lodash-es';
import { OEN_CONTROL_DECLARATIONS } from '../../../src/controls/consts.ts';
import { formatButtonBorderRules } from '../../../src/controls/format-button-border-rules.ts';
import { formatButtonLabelRule } from '../../../src/controls/format-button-label-rule.ts';
import { formatButtonRadiusRule } from '../../../src/controls/format-button-radius-rule.ts';
import { formatButtonShadowRules } from '../../../src/controls/format-button-shadow-rules.ts';
import { formatThemeControlDeclaration } from '../../../src/controls/format-theme-control-declaration.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { filterMissingDeclarations } from './filter-missing-declarations.ts';
import { formatMissingDeclarationsIssue } from './format-missing-declarations-issue.ts';

const CHECK_NAME = 'controls are the configured Oen metrics';

export const validateThemeControls = ({
  stylesheet,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: `${size(OEN_CONTROL_DECLARATIONS)} declarations and the button radius, border, shadow and label rules compile to their configured metrics`,
  issue: formatMissingDeclarationsIssue(
    filterMissingDeclarations(
      stylesheet.text,
      concat(
        map(OEN_CONTROL_DECLARATIONS, formatThemeControlDeclaration),
        formatButtonRadiusRule(),
        formatButtonBorderRules(),
        formatButtonShadowRules(),
        formatButtonLabelRule(),
      ),
    ),
  ),
});

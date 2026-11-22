import { pipe } from 'remeda';
import { patchOenButtonBorder } from '../controls/patch-oen-button-border.ts';
import { patchOenButtonGlass } from '../controls/patch-oen-button-glass.ts';
import { patchOenButtonLabel } from '../controls/patch-oen-button-label.ts';
import { patchOenButtonRadius } from '../controls/patch-oen-button-radius.ts';
import { patchOenButtonShadow } from '../controls/patch-oen-button-shadow.ts';
import { formatConfiguration } from './internal/format-configuration.ts';
import { formatUseStatement } from './internal/format-use-statement.ts';
import { toBulmaConfiguration } from './internal/to-bulma-configuration.ts';
import { toIndentedVariables } from './internal/to-indented-variables.ts';

export const toOenStylesheetSource = (): string =>
  pipe(
    toBulmaConfiguration(),
    toIndentedVariables,
    formatConfiguration,
    formatUseStatement,
    patchOenButtonRadius,
    patchOenButtonBorder,
    patchOenButtonGlass,
    patchOenButtonShadow,
    patchOenButtonLabel,
  );

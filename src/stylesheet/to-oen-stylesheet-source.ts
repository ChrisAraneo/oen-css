import { pipe } from 'remeda';
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
  );

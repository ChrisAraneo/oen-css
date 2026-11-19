import { map } from 'lodash-es';

const CONFIGURATION_INDENT = '  ';

export const toIndentedVariables = (
  variables: readonly string[],
): readonly string[] =>
  map(variables, (variable) => `${CONFIGURATION_INDENT}${variable}`);

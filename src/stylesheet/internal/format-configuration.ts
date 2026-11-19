import { join } from 'lodash-es';

const CONFIGURATION_SEPARATOR = ',\n';

export const formatConfiguration = (variables: readonly string[]): string =>
  join(variables, CONFIGURATION_SEPARATOR);

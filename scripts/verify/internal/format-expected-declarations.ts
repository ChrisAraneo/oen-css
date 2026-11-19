import { join, map } from 'lodash-es';

export const formatExpectedDeclarations = (
  missing: readonly string[],
): string =>
  join(
    map(missing, (declaration) => `  expected: ${declaration}`),
    '\n',
  );

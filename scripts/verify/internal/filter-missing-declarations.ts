import { filter, includes } from 'lodash-es';

export const filterMissingDeclarations = (
  css: string,
  expected: readonly string[],
): readonly string[] =>
  filter(expected, (declaration) => !includes(css, declaration));

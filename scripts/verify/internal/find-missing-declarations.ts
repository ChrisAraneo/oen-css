import { filter, includes } from 'lodash-es';

export const findMissingDeclarations = (
  css: string,
  expected: readonly string[],
): readonly string[] =>
  filter(expected, (declaration) => !includes(css, declaration));

import { includes, some } from 'lodash-es';

const SELECTOR_BOUNDARIES: readonly string[] = Object.freeze([
  ' ',
  ',',
  ':',
  '.',
  '>',
  '{',
  ')',
  '\n',
]);

export const hasClassDeclaration = (css: string, className: string): boolean =>
  some(SELECTOR_BOUNDARIES, (boundary) =>
    includes(css, `.${className}${boundary}`),
  );

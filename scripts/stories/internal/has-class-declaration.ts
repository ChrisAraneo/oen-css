import { includes, some } from 'lodash-es';
import { SELECTOR_BOUNDARIES } from './consts.ts';

export const hasClassDeclaration = (css: string, className: string): boolean =>
  some(SELECTOR_BOUNDARIES, (boundary) =>
    includes(css, `.${className}${boundary}`),
  );

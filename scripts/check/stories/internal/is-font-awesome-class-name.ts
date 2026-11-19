import { includes, some, startsWith } from 'lodash-es';

const FONT_AWESOME_CLASS_PREFIXES: readonly string[] = Object.freeze(['fa-']);

const FONT_AWESOME_STYLE_CLASSES: readonly string[] = Object.freeze([
  'fas',
  'far',
  'fab',
]);

export const isFontAwesomeClassName = (className: string): boolean =>
  includes(FONT_AWESOME_STYLE_CLASSES, className) ||
  some(FONT_AWESOME_CLASS_PREFIXES, (prefix) => startsWith(className, prefix));

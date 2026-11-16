import { includes, some, startsWith } from 'lodash-es';

const FONT_AWESOME_CLASS_PREFIXES: readonly string[] = Object.freeze(['fa-']);
const FONT_AWESOME_STYLE_CLASSES: readonly string[] = Object.freeze([
  'fas',
  'far',
  'fab',
]);
const BULMA_CLASSES_WITHOUT_DECLARATIONS: readonly string[] = Object.freeze([
  'dropdown-trigger',
]);

const isFontAwesomeClassName = (className: string): boolean =>
  includes(FONT_AWESOME_STYLE_CLASSES, className) ||
  some(FONT_AWESOME_CLASS_PREFIXES, (prefix) => startsWith(className, prefix));

export const isCheckableClassName = (className: string): boolean =>
  !isFontAwesomeClassName(className) &&
  !includes(BULMA_CLASSES_WITHOUT_DECLARATIONS, className);

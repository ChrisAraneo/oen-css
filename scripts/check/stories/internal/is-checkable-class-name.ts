import { includes } from 'lodash-es';
import { isFontAwesomeClassName } from './is-font-awesome-class-name.ts';

const BULMA_CLASSES_WITHOUT_DECLARATIONS: readonly string[] = Object.freeze([
  'dropdown-trigger',
]);

export const isCheckableClassName = (className: string): boolean =>
  !isFontAwesomeClassName(className) &&
  !includes(BULMA_CLASSES_WITHOUT_DECLARATIONS, className);

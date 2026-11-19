import { includes } from 'lodash-es';

const TEMPLATE_PLACEHOLDER = '${';

const UNRESOLVED_BRACE = '{';

export const isStillInterpolated = (classAttribute: string): boolean =>
  includes(classAttribute, TEMPLATE_PLACEHOLDER) ||
  includes(classAttribute, UNRESOLVED_BRACE);

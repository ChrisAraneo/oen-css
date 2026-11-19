import { replace } from 'lodash-es';

const CUSTOM_PROPERTY_MARKER = '--';

const UNMARKED = '';

export const toSassPrefix = (prefix: string): string =>
  replace(prefix, CUSTOM_PROPERTY_MARKER, UNMARKED);

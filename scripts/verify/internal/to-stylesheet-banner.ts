import { head } from 'lodash-es';

const LEADING_COMMENT = /^[\s\S]*?\*\//;

export const toStylesheetBanner = (css: string): string =>
  head(css.match(LEADING_COMMENT) ?? []) ?? '';

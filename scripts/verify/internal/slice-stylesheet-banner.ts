import { head } from 'lodash-es';

const LEADING_COMMENT = /^[\s\S]*?\*\//;

export const sliceStylesheetBanner = (css: string): string =>
  head(css.match(LEADING_COMMENT) ?? []) ?? '';

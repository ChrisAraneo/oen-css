import { repeat, replace } from 'lodash-es';
import { LEADING_CHARSET_AND_OEN_BANNER } from './consts.ts';
import { countNewlines } from './internal/count-newlines.ts';

export const toBlankedStylesheetHeader = (css: string): string =>
  replace(css, LEADING_CHARSET_AND_OEN_BANNER, (header) =>
    repeat('\n', countNewlines(header)),
  );

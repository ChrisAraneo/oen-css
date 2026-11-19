import { repeat, replace } from 'lodash-es';
import { countNewlines } from './internal/count-newlines.ts';

const LEADING_CHARSET_AND_OEN_BANNER =
  /^(?:\s*@charset\s+"[^"]*";)?\s*\/\*![\s\S]*?\*\//i;

export const patchBlankedStylesheetHeader = (css: string): string =>
  replace(css, LEADING_CHARSET_AND_OEN_BANNER, (header) =>
    repeat('\n', countNewlines(header)),
  );

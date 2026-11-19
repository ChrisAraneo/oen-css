import { replace } from 'lodash-es';
import { pipe } from 'remeda';
import { LEADING_CHARSET_DECLARATION } from './consts.ts';

const LEADING_OEN_BANNER = /^\/\*![\s\S]*?\*\/\s*/;

export const toStylesheetBody = (css: string): string =>
  pipe(
    css,
    (css) => replace(css, LEADING_CHARSET_DECLARATION, ''),
    (css) => replace(css, LEADING_OEN_BANNER, ''),
  );

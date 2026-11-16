import { replace } from 'lodash-es';
import { CHARSET_DECLARATION, LEADING_CHARSET_DECLARATION } from './consts.ts';

export const patchStylesheetHeader = (css: string, banner: string): string =>
  `${CHARSET_DECLARATION}\n${banner}\n${replace(css, LEADING_CHARSET_DECLARATION, '')}`;

import CleanCSS from 'clean-css';
import { tryCatch } from 'ramda';
import { formatErrorMessage } from '../../common/format-error-message.ts';
import { toMinifiedStylesheet } from './to-minified-stylesheet.ts';
import type { MinifiedStylesheet } from './types/minified-stylesheet.ts';

const KEEP_EVERY_LICENSE_COMMENT = 'all';

const NO_WARNINGS: readonly string[] = Object.freeze([]);

export const minifyStylesheet: (
  css: string,
  fileName: string,
) => MinifiedStylesheet = tryCatch(
  (css: string, fileName: string) =>
    toMinifiedStylesheet(
      new CleanCSS({
        level: { 1: { specialComments: KEEP_EVERY_LICENSE_COMMENT } },
      }).minify(css),
      fileName,
    ),
  (error: unknown) => ({
    css: '',
    warnings: NO_WARNINGS,
    problem: formatErrorMessage(error),
  }),
);

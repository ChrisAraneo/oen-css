import { tryCatch } from 'ramda';
import { compileString } from 'sass';
import { formatErrorMessage } from '../format-error-message.ts';
import { SASS_COMPILE_OPTIONS } from './internal/consts.ts';
import type { CompiledStylesheet } from './types/compiled-stylesheet.ts';

const UNCONFIGURED_BULMA_ENTRY_POINT = '@use "pkg:bulma/sass";';

export const readCompiledBulmaStylesheet: () => CompiledStylesheet = tryCatch(
  () => ({
    css: compileString(UNCONFIGURED_BULMA_ENTRY_POINT, SASS_COMPILE_OPTIONS)
      .css,
    issue: undefined,
  }),
  (error: unknown) => ({ css: '', issue: formatErrorMessage(error) }),
);

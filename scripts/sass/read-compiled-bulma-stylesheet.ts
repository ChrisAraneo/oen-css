import { tryCatch } from 'ramda';
import { compileString } from 'sass';
import { formatErrorMessage } from '../common/format-error-message.ts';
import {
  SASS_COMPILE_OPTIONS,
  UNCONFIGURED_BULMA_ENTRY_POINT,
} from './internal/consts.ts';
import type { CompiledStylesheet } from './types/compiled-stylesheet.ts';

export const readCompiledBulmaStylesheet: () => CompiledStylesheet = tryCatch(
  () => ({
    css: compileString(UNCONFIGURED_BULMA_ENTRY_POINT, SASS_COMPILE_OPTIONS)
      .css,
    problem: undefined,
  }),
  (error: unknown) => ({ css: '', problem: formatErrorMessage(error) }),
);

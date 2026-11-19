import { tryCatch } from 'ramda';
import { compileString } from 'sass';
import { toOenStylesheetSource } from '../../../src/stylesheet/to-oen-stylesheet-source.ts';
import { formatErrorMessage } from '../format-error-message.ts';
import { SASS_COMPILE_OPTIONS } from './internal/consts.ts';
import type { CompiledStylesheet } from './types/compiled-stylesheet.ts';

export const readCompiledOenStylesheet: () => CompiledStylesheet = tryCatch(
  () => ({
    css: compileString(toOenStylesheetSource(), SASS_COMPILE_OPTIONS).css,
    issue: undefined,
  }),
  (error: unknown) => ({ css: '', issue: formatErrorMessage(error) }),
);

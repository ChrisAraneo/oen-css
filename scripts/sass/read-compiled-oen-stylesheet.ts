import { tryCatch } from 'ramda';
import { compile } from 'sass';
import { formatErrorMessage } from '../common/format-error-message.ts';
import { SASS_ENTRY_POINT } from '../consts.ts';
import { SASS_COMPILE_OPTIONS } from './internal/consts.ts';
import type { CompiledStylesheet } from './types/compiled-stylesheet.ts';

export const readCompiledOenStylesheet: () => CompiledStylesheet = tryCatch(
  () => ({
    css: compile(SASS_ENTRY_POINT, SASS_COMPILE_OPTIONS).css,
    problem: undefined,
  }),
  (error: unknown) => ({ css: '', problem: formatErrorMessage(error) }),
);

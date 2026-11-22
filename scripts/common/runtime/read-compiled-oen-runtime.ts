import { buildSync } from 'esbuild';
import { tryCatch } from 'ramda';
import { formatErrorMessage } from '../format-error-message.ts';
import { RUNTIME_BUILD_OPTIONS } from './internal/consts.ts';
import { toRuntimeCode } from './internal/to-runtime-code.ts';
import type { CompiledRuntime } from './types/compiled-runtime.ts';

const NO_CODE = '';

export const readCompiledOenRuntime: () => CompiledRuntime = tryCatch(
  () => ({
    code: toRuntimeCode(
      buildSync({ ...RUNTIME_BUILD_OPTIONS, minify: false }).outputFiles,
    ),
    minifiedCode: toRuntimeCode(
      buildSync({ ...RUNTIME_BUILD_OPTIONS, minify: true }).outputFiles,
    ),
    issue: undefined,
  }),
  (error: unknown) => ({
    code: NO_CODE,
    minifiedCode: NO_CODE,
    issue: formatErrorMessage(error),
  }),
);

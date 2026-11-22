import type { OutputFile } from 'esbuild';
import { first } from 'lodash-es';

const NO_CODE = '';

export const toRuntimeCode = (
  outputFiles: readonly OutputFile[] | undefined,
): string => first(outputFiles)?.text ?? NO_CODE;

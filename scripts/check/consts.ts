import { resolve } from 'node:path';
import { NODE_MODULES_DIRECTORY } from '../common/consts.ts';

const NO_EMIT_FLAG = '--noEmit';

export const FORMAT_FLAG = '--format';

export const TYPES_FLAG = '--types';

export const BUILD_FLAG = '--build';

export const VERIFY_FLAG = '--verify';

export const STORIES_FLAG = '--stories';

export const TYPESCRIPT_CLI: string = resolve(
  NODE_MODULES_DIRECTORY,
  'typescript',
  'bin',
  'tsc',
);

export const TYPECHECK_ARGUMENTS: readonly string[] = Object.freeze([
  NO_EMIT_FLAG,
]);

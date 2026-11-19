import { resolve } from 'node:path';
import { NODE_MODULES_DIRECTORY } from '../common/consts.ts';

const EVERY_FILE = '.';

const WRITE_FLAG = '--write';

export const CHECK_FLAG = '--check';

export const PRETTIER_CLI: string = resolve(
  NODE_MODULES_DIRECTORY,
  'prettier',
  'bin',
  'prettier.cjs',
);

export const WRITE_ARGUMENTS: readonly string[] = Object.freeze([
  WRITE_FLAG,
  EVERY_FILE,
]);

export const CHECK_ARGUMENTS: readonly string[] = Object.freeze([
  CHECK_FLAG,
  EVERY_FILE,
]);

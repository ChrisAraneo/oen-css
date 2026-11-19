import { toString } from 'lodash-es';
import { resolve } from 'node:path';
import {
  NODE_MODULES_DIRECTORY,
  STORYBOOK_STATIC_DIRECTORY,
} from '../common/consts.ts';

const DEV_COMMAND = 'dev';

const BUILD_COMMAND = 'build';

const PORT_FLAG = '-p';

const OUTPUT_DIRECTORY_FLAG = '--output-dir';

const STORYBOOK_PORT = 6006;

export const BUILD_FLAG = '--build';

export const STORYBOOK_CLI: string = resolve(
  NODE_MODULES_DIRECTORY,
  'storybook',
  'dist',
  'bin',
  'dispatcher.js',
);

export const DEV_ARGUMENTS: readonly string[] = Object.freeze([
  DEV_COMMAND,
  PORT_FLAG,
  toString(STORYBOOK_PORT),
]);

export const BUILD_ARGUMENTS: readonly string[] = Object.freeze([
  BUILD_COMMAND,
  OUTPUT_DIRECTORY_FLAG,
  STORYBOOK_STATIC_DIRECTORY,
]);

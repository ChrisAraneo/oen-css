import type { WatchOptions } from 'node:fs';
import { resolve } from 'node:path';
import { REPOSITORY_ROOT } from '../common/consts.ts';

const SCRIPTS_DIRECTORY: string = resolve(REPOSITORY_ROOT, 'scripts');

export const WATCH_FLAG = '--watch';

export const REBUILD_DEBOUNCE_MS = 50;

export const SOURCE_WATCH_OPTIONS: Readonly<WatchOptions> = Object.freeze({
  recursive: true,
});

export const BUILD_CLI: string = resolve(SCRIPTS_DIRECTORY, 'build.ts');

export const NO_BUILD_ARGUMENTS: readonly string[] = Object.freeze([]);

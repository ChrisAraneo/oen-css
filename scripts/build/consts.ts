import type { WatchOptions } from 'node:fs';

export const WATCH_FLAG = '--watch';
export const REBUILD_DEBOUNCE_MS = 50;
export const SOURCE_WATCH_OPTIONS: WatchOptions = Object.freeze({
  recursive: true,
});

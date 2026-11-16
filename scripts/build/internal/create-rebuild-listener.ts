import { debounce } from 'lodash-es';
import { REBUILD_DEBOUNCE_MS } from '../consts.ts';
import { runRebuild } from './run-rebuild.ts';
import type { RebuildListener } from './types/rebuild-listener.ts';

export const createRebuildListener = (now: () => number): RebuildListener =>
  debounce(() => runRebuild(now), REBUILD_DEBOUNCE_MS);

import { watch } from 'node:fs';
import { runEffect } from '../../common/run-effect.ts';
import { SRC_DIRECTORY } from '../../consts.ts';
import { SOURCE_WATCH_OPTIONS } from '../consts.ts';
import { createRebuildListener } from './create-rebuild-listener.ts';
import { writeWatchNotice } from './write-watch-notice.ts';

export const startRebuildWatch = (now: () => number): void =>
  void runEffect(
    watch(SRC_DIRECTORY, SOURCE_WATCH_OPTIONS, createRebuildListener(now)),
    writeWatchNotice,
  );

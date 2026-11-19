import { watch } from 'node:fs';
import { SRC_DIRECTORY } from '../../common/consts.ts';
import { runEffect } from '../../common/run-effect.ts';
import { SOURCE_WATCH_OPTIONS } from '../consts.ts';
import { createRebuildListener } from './create-rebuild-listener.ts';
import { writeWatchNotice } from './write-watch-notice.ts';

export const startRebuildWatch = (): void =>
  void runEffect(
    watch(SRC_DIRECTORY, SOURCE_WATCH_OPTIONS, createRebuildListener()),
    writeWatchNotice,
  );

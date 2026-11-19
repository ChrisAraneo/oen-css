import { runEffect } from '../../common/run-effect.ts';
import { runProcess } from '../../common/run-process.ts';
import { BUILD_CLI, NO_BUILD_ARGUMENTS } from '../consts.ts';
import { writeRebuildNotice } from './write-rebuild-notice.ts';

export const runRebuild = (): Promise<boolean> =>
  runProcess(runEffect(BUILD_CLI, writeRebuildNotice), NO_BUILD_ARGUMENTS);

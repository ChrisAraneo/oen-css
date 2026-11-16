import { runEffect } from '../../common/run-effect.ts';
import { runBuild } from './run-build.ts';
import { writeRebuildNotice } from './write-rebuild-notice.ts';

export const runRebuild = (now: () => number): Promise<boolean> =>
  runBuild(runEffect(now, writeRebuildNotice));

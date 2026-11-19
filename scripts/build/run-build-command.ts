import { includes } from 'lodash-es';
import { match } from 'ts-pattern';
import { patchExitCodeOnFailure } from '../common/patch-exit-code-on-failure.ts';
import { WATCH_FLAG } from './consts.ts';
import { startRebuildWatch } from './internal/start-rebuild-watch.ts';
import { runBuild } from './run-build.ts';

export const runBuildCommand = (
  commandArguments: readonly string[],
  now: () => number,
): Promise<void> =>
  runBuild(now).then((succeeded) =>
    match(includes(commandArguments, WATCH_FLAG))
      .with(true, () => startRebuildWatch())
      .otherwise(() => patchExitCodeOnFailure(succeeded)),
  );

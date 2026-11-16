import { noop } from 'lodash-es';
import { match } from 'ts-pattern';
import { patchExitCode } from '../common/patch-exit-code.ts';
import { FAILURE_EXIT_CODE } from '../consts.ts';
import { runBuild } from './internal/run-build.ts';
import { startRebuildWatch } from './internal/start-rebuild-watch.ts';

export const runBuildCommand = (
  watching: boolean,
  now: () => number,
): Promise<void> =>
  runBuild(now).then((succeeded) =>
    match({ watching, succeeded })
      .with({ watching: true }, () => startRebuildWatch(now))
      .with({ succeeded: false }, () => patchExitCode(FAILURE_EXIT_CODE))
      .otherwise(noop),
  );

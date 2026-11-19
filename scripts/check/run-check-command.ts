import { patchExitCodeOnFailure } from '../common/patch-exit-code-on-failure.ts';
import { runCheck } from './run-check.ts';

export const runCheckCommand = (
  commandArguments: readonly string[],
  now: () => number,
): Promise<void> =>
  runCheck(commandArguments, now).then(patchExitCodeOnFailure);

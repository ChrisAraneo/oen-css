import { patchExitCodeOnFailure } from '../common/patch-exit-code-on-failure.ts';
import { runVerify } from './run-verify.ts';

export const runVerifyCommand = (): Promise<void> =>
  runVerify().then(patchExitCodeOnFailure);

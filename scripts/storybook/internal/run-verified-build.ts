import { runBuild } from '../../build/run-build.ts';
import { runAfterSuccess } from '../../common/run-after-success.ts';
import { runVerify } from '../../verify/run-verify.ts';

export const runVerifiedBuild = (now: () => number): Promise<boolean> =>
  runBuild(now).then((succeeded) => runAfterSuccess(succeeded, runVerify));

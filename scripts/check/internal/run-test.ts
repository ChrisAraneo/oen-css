import { runProcess } from '../../common/run-process.ts';
import { TEST_ARGUMENTS, VITEST_CLI } from '../consts.ts';

export const runTest = (): Promise<boolean> =>
  runProcess(VITEST_CLI, TEST_ARGUMENTS);

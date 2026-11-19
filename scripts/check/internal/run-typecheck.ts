import { runProcess } from '../../common/run-process.ts';
import { TYPECHECK_ARGUMENTS, TYPESCRIPT_CLI } from '../consts.ts';

export const runTypecheck = (): Promise<boolean> =>
  runProcess(TYPESCRIPT_CLI, TYPECHECK_ARGUMENTS);

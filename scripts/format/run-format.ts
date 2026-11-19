import { runProcess } from '../common/run-process.ts';
import { PRETTIER_CLI } from './consts.ts';
import { toFormatArguments } from './internal/to-format-arguments.ts';

export const runFormat = (checking: boolean): Promise<boolean> =>
  runProcess(PRETTIER_CLI, toFormatArguments(checking));

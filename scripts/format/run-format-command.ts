import { includes } from 'lodash-es';
import { patchExitCodeOnFailure } from '../common/patch-exit-code-on-failure.ts';
import { CHECK_FLAG } from './consts.ts';
import { runFormat } from './run-format.ts';

export const runFormatCommand = (
  commandArguments: readonly string[],
): Promise<void> =>
  runFormat(includes(commandArguments, CHECK_FLAG)).then(
    patchExitCodeOnFailure,
  );

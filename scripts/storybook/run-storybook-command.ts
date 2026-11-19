import { includes } from 'lodash-es';
import { patchExitCodeOnFailure } from '../common/patch-exit-code-on-failure.ts';
import { BUILD_FLAG } from './consts.ts';
import { runStorybook } from './run-storybook.ts';

export const runStorybookCommand = (
  commandArguments: readonly string[],
  now: () => number,
): Promise<void> =>
  runStorybook(includes(commandArguments, BUILD_FLAG), now).then(
    patchExitCodeOnFailure,
  );

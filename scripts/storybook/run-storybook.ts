import { runAfterSuccess } from '../common/run-after-success.ts';
import { runProcess } from '../common/run-process.ts';
import { STORYBOOK_CLI } from './consts.ts';
import { runVerifiedBuild } from './internal/run-verified-build.ts';
import { toStorybookArguments } from './internal/to-storybook-arguments.ts';

export const runStorybook = (
  building: boolean,
  now: () => number,
): Promise<boolean> =>
  runVerifiedBuild(now).then((succeeded) =>
    runAfterSuccess(succeeded, () =>
      runProcess(STORYBOOK_CLI, toStorybookArguments(building)),
    ),
  );

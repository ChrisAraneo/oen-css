import { noop } from 'lodash-es';
import { match } from 'ts-pattern';
import { patchExitCode } from './internal/patch-exit-code.ts';

const FAILURE_EXIT_CODE = 1;

export const patchExitCodeOnFailure = (succeeded: boolean): void =>
  match(succeeded)
    .with(true, noop)
    .otherwise(() => patchExitCode(FAILURE_EXIT_CODE));

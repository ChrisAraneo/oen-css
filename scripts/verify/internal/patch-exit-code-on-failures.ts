import { isEmpty, noop } from 'lodash-es';
import { match } from 'ts-pattern';
import { patchExitCode } from '../../common/patch-exit-code.ts';
import { FAILURE_EXIT_CODE } from '../../consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import { findFailedChecks } from './find-failed-checks.ts';

export const patchExitCodeOnFailures = (
  results: readonly CheckResult[],
): void =>
  match(isEmpty(findFailedChecks(results)))
    .with(true, noop)
    .otherwise(() => patchExitCode(FAILURE_EXIT_CODE));

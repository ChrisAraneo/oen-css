import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeProblemLines } from '../../common/write-problem-lines.ts';
import type { CheckResult } from '../types/check-result.ts';
import { formatCheckTally } from './format-check-tally.ts';
import { formatFailedChecks } from './format-failed-checks.ts';
import { formatPassedChecks } from './format-passed-checks.ts';
import { patchExitCodeOnFailures } from './patch-exit-code-on-failures.ts';

export const writeVerifyReport = (results: readonly CheckResult[]): void =>
  pipe(
    runEffect(results, (results) => writeLines(formatPassedChecks(results))),
    (results) =>
      runEffect(results, (results) =>
        writeProblemLines(formatFailedChecks(results)),
      ),
    (results) =>
      runEffect(results, (results) => writeLines(formatCheckTally(results))),
    (results) => patchExitCodeOnFailures(results),
  );

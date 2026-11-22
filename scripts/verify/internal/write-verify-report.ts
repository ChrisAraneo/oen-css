import { isEmpty } from 'lodash-es';
import { pipe } from 'remeda';
import { runEffect } from '../../../src/common/run-effect.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeIssueLines } from '../../common/write-issue-lines.ts';
import type { CheckResult } from '../types/check-result.ts';
import { filterFailedChecks } from './filter-failed-checks.ts';
import { formatCheckTally } from './format-check-tally.ts';
import { formatFailedChecks } from './format-failed-checks.ts';
import { formatPassedChecks } from './format-passed-checks.ts';

export const writeVerifyReport = (results: readonly CheckResult[]): boolean =>
  pipe(
    runEffect(results, (results) => writeLines(formatPassedChecks(results))),
    (results) =>
      runEffect(results, (results) =>
        writeIssueLines(formatFailedChecks(results)),
      ),
    (results) =>
      runEffect(results, (results) => writeLines(formatCheckTally(results))),
    (results) => isEmpty(filterFailedChecks(results)),
  );

import { join, map, split } from 'lodash-es';
import type { CheckResult } from '../types/check-result.ts';
import { filterFailedChecks } from './filter-failed-checks.ts';

const ISSUE_INDENT = '\n        ';

export const formatFailedChecks = (
  results: readonly CheckResult[],
): readonly string[] =>
  map(
    filterFailedChecks(results),
    ({ name, issue }) =>
      `  FAIL  ${name}${ISSUE_INDENT}${join(split(issue, '\n'), ISSUE_INDENT)}`,
  );

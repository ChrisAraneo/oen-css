import { join, map, split } from 'lodash-es';
import { pipe } from 'remeda';
import type { CheckResult } from '../types/check-result.ts';
import { findFailedChecks } from './find-failed-checks.ts';

const PROBLEM_INDENT = '\n        ';

export const formatFailedChecks = (
  results: readonly CheckResult[],
): readonly string[] =>
  pipe(findFailedChecks(results), (failed) =>
    map(
      failed,
      ({ name, problem }) =>
        `  FAIL  ${name}${PROBLEM_INDENT}${join(split(problem, '\n'), PROBLEM_INDENT)}`,
    ),
  );

import { filter, isUndefined, map } from 'lodash-es';
import { pipe } from 'remeda';
import type { CheckResult } from '../types/check-result.ts';

export const formatPassedChecks = (
  results: readonly CheckResult[],
): readonly string[] =>
  pipe(
    filter(results, (result) => isUndefined(result.problem)),
    (passed) => map(passed, ({ name, detail }) => `  ok    ${name}: ${detail}`),
  );

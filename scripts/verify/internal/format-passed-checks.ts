import { filter, isUndefined, map } from 'lodash-es';
import type { CheckResult } from '../types/check-result.ts';

export const formatPassedChecks = (
  results: readonly CheckResult[],
): readonly string[] =>
  map(
    filter(results, (result) => isUndefined(result.issue)),
    ({ name, detail }) => `  ok    ${name}: ${detail}`,
  );

import { filter, isString } from 'lodash-es';
import type { CheckResult } from '../types/check-result.ts';

export const findFailedChecks = (
  results: readonly CheckResult[],
): readonly CheckResult[] =>
  filter(results, (result) => isString(result.problem));

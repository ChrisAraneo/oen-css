import { size } from 'lodash-es';
import { BLANK_LINE } from '../../common/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import { filterFailedChecks } from './filter-failed-checks.ts';

export const formatCheckTally = (
  results: readonly CheckResult[],
): readonly string[] => [
  BLANK_LINE,
  `${size(results) - size(filterFailedChecks(results))}/${size(results)} checks passed`,
];

import { size } from 'lodash-es';
import type { CheckResult } from '../types/check-result.ts';
import { findFailedChecks } from './find-failed-checks.ts';

const BLANK_LINE = '';

export const formatCheckTally = (
  results: readonly CheckResult[],
): readonly string[] => [
  BLANK_LINE,
  `${size(results) - size(findFailedChecks(results))}/${size(results)} checks passed`,
];

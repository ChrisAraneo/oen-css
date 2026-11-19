import { filter, size } from 'lodash-es';
import { BLANK_LINE } from '../../common/consts.ts';
import type { CheckOutcome } from './types/check-outcome.ts';

export const formatStepSummary = (
  outcomes: readonly CheckOutcome[],
  stepCount: number,
): readonly string[] => [
  BLANK_LINE,
  `${size(filter(outcomes, ({ succeeded }) => succeeded))}/${stepCount} steps passed`,
];

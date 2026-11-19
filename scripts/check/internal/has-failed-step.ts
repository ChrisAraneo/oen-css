import { some } from 'lodash-es';
import type { CheckOutcome } from './types/check-outcome.ts';

export const hasFailedStep = (outcomes: readonly CheckOutcome[]): boolean =>
  some(outcomes, ({ succeeded }) => !succeeded);

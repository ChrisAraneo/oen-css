import { pipe } from 'remeda';
import { runEffect } from '../../../src/common/run-effect.ts';
import type { CheckOutcome } from './types/check-outcome.ts';
import type { CheckStep } from './types/check-step.ts';
import { writeStepNotice } from './write-step-notice.ts';

export const runStep = ({ name, run }: CheckStep): Promise<CheckOutcome> =>
  pipe(runEffect(name, writeStepNotice), (name) =>
    run().then((succeeded) => ({ name, succeeded })),
  );

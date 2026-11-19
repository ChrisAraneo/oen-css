import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeIssueLines } from '../../common/write-issue-lines.ts';
import { formatFailedSteps } from './format-failed-steps.ts';
import { formatStepTally } from './format-step-tally.ts';
import { hasFailedStep } from './has-failed-step.ts';
import type { CheckOutcome } from './types/check-outcome.ts';

export const writeCheckReport = (
  outcomes: readonly CheckOutcome[],
  stepCount: number,
): boolean =>
  pipe(
    runEffect(outcomes, (outcomes) =>
      writeIssueLines(formatFailedSteps(outcomes)),
    ),
    (outcomes) =>
      runEffect(outcomes, (outcomes) =>
        writeLines(formatStepTally(outcomes, stepCount)),
      ),
    (outcomes) => !hasFailedStep(outcomes),
  );

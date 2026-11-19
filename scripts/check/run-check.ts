import { size } from 'lodash-es';
import { pipe } from 'remeda';
import { filterSelectedSteps } from './internal/filter-selected-steps.ts';
import { runEveryStep } from './internal/run-every-step.ts';
import { toCheckSteps } from './internal/to-check-steps.ts';
import { writeCheckReport } from './internal/write-check-report.ts';

export const runCheck = (
  commandArguments: readonly string[],
  now: () => number,
): Promise<boolean> =>
  pipe(filterSelectedSteps(toCheckSteps(now), commandArguments), (steps) =>
    runEveryStep(steps).then((outcomes) =>
      writeCheckReport(outcomes, size(steps)),
    ),
  );

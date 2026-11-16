import { isEmpty } from 'lodash-es';
import { match } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeProblemLines } from '../../common/write-problem-lines.ts';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import { formatBuildProblems } from './format-build-problems.ts';
import { formatBuildReport } from './format-build-report.ts';

export const writeBuildReport = (
  artifacts: BuildArtifacts,
  now: () => number,
): boolean =>
  runEffect(isEmpty(artifacts.problems), (succeeded) =>
    match(succeeded)
      .with(true, () =>
        writeLines(formatBuildReport(artifacts, now() - artifacts.startedAt)),
      )
      .otherwise(() =>
        writeProblemLines(formatBuildProblems(artifacts.problems)),
      ),
  );

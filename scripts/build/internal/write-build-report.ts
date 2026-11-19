import { isEmpty } from 'lodash-es';
import { match } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeIssueLines } from '../../common/write-issue-lines.ts';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import { formatBuildIssues } from './format-build-issues.ts';
import { formatBuildReport } from './format-build-report.ts';

export const writeBuildReport = (
  artifacts: BuildArtifacts,
  now: () => number,
): boolean =>
  runEffect(isEmpty(artifacts.issues), (succeeded) =>
    match(succeeded)
      .with(true, () =>
        writeLines(formatBuildReport(artifacts, now() - artifacts.startedAt)),
      )
      .otherwise(() => writeIssueLines(formatBuildIssues(artifacts.issues))),
  );

import { pipe } from 'remeda';
import { runEffect } from '../../../../src/common/run-effect.ts';
import { writeLines } from '../../../common/write-lines.ts';
import { writeIssueLines } from '../../../common/write-issue-lines.ts';
import type { GalleryReport } from '../types/gallery-report.ts';
import { formatGalleryOutcome } from './format-gallery-outcome.ts';
import { formatGalleryIssues } from './format-gallery-issues.ts';
import { formatGallerySummary } from './format-gallery-summary.ts';
import { hasGalleryIssues } from './has-gallery-issues.ts';

export const writeGalleryReport = (report: GalleryReport): boolean =>
  pipe(
    runEffect(report, (report) => writeLines(formatGallerySummary(report))),
    (report) =>
      runEffect(report, (report) =>
        writeIssueLines(formatGalleryIssues(report)),
      ),
    (report) =>
      runEffect(report, (report) => writeLines(formatGalleryOutcome(report))),
    (report) => !hasGalleryIssues(report),
  );

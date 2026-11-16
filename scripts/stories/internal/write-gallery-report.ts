import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeProblemLines } from '../../common/write-problem-lines.ts';
import type { GalleryReport } from '../types/gallery-report.ts';
import { formatGalleryOutcome } from './format-gallery-outcome.ts';
import { formatGalleryProblems } from './format-gallery-problems.ts';
import { formatGallerySummary } from './format-gallery-summary.ts';
import { patchExitCodeOnGalleryProblems } from './patch-exit-code-on-gallery-problems.ts';

export const writeGalleryReport = (report: GalleryReport): void =>
  pipe(
    runEffect(report, (report) => writeLines(formatGallerySummary(report))),
    (report) =>
      runEffect(report, (report) =>
        writeProblemLines(formatGalleryProblems(report)),
      ),
    (report) =>
      runEffect(report, (report) => writeLines(formatGalleryOutcome(report))),
    (report) => patchExitCodeOnGalleryProblems(report),
  );

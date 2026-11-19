import { match } from 'ts-pattern';
import { OEN_STYLESHEET } from '../../../common/dist/consts.ts';
import type { GalleryReport } from '../types/gallery-report.ts';
import { hasGalleryIssues } from './has-gallery-issues.ts';

const NOTHING_TO_REPORT: readonly string[] = Object.freeze([]);

export const formatGalleryOutcome = (
  report: GalleryReport,
): readonly string[] =>
  match(hasGalleryIssues(report))
    .with(true, () => NOTHING_TO_REPORT)
    .otherwise(() => [
      `  every class exists in dist/${OEN_STYLESHEET} or .storybook/storybook.css`,
    ]);

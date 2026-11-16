import { match } from 'ts-pattern';
import { OEN_STYLESHEET } from '../../dist/consts.ts';
import type { GalleryReport } from '../types/gallery-report.ts';
import { hasGalleryProblems } from './has-gallery-problems.ts';

const NOTHING_TO_REPORT: readonly string[] = Object.freeze([]);

export const formatGalleryOutcome = (
  report: GalleryReport,
): readonly string[] =>
  match(hasGalleryProblems(report))
    .with(true, () => NOTHING_TO_REPORT)
    .otherwise(() => [
      `  every class exists in dist/${OEN_STYLESHEET} or .storybook/storybook.css`,
    ]);

import type { GalleryReport } from '../types/gallery-report.ts';

export const formatGallerySummary = ({
  renderedStoryCount,
  storiesNeedingABrowserCount,
  checkedClassNameCount,
}: GalleryReport): readonly string[] => [
  `  rendered ${renderedStoryCount} stories, skipped ${storiesNeedingABrowserCount} that need a browser`,
  `  checked ${checkedClassNameCount} distinct classes used by the gallery`,
];

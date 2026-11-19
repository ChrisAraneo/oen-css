import type { GalleryReport } from '../types/gallery-report.ts';

export const formatGallerySummary = ({
  renderedStoryCount,
  storiesNeedingBrowserCount,
  checkedClassNameCount,
}: GalleryReport): readonly string[] => [
  `  rendered ${renderedStoryCount} stories, skipped ${storiesNeedingBrowserCount} that need a browser`,
  `  checked ${checkedClassNameCount} distinct classes used by the gallery`,
];

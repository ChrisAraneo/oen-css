import { computeGalleryReport } from './compute-gallery-report.ts';
import { readGallery } from './internal/read-gallery.ts';
import { writeGalleryReport } from './internal/write-gallery-report.ts';

export const runCheckStoriesCommand = (): Promise<void> =>
  readGallery().then(computeGalleryReport).then(writeGalleryReport);

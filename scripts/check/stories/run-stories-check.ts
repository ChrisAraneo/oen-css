import { computeGalleryReport } from './compute-gallery-report.ts';
import { readGallery } from './internal/read-gallery.ts';
import { writeGalleryReport } from './internal/write-gallery-report.ts';

export const runStoriesCheck = (): Promise<boolean> =>
  readGallery().then(computeGalleryReport).then(writeGalleryReport);

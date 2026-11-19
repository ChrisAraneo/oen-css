import { pipe } from 'remeda';
import { computeGalleryClassNames } from './internal/compute-gallery-class-names.ts';
import { findGalleryIssues } from './internal/find-gallery-issues.ts';
import type { GalleryReport } from './types/gallery-report.ts';
import type { Gallery } from './types/gallery.ts';

export const computeGalleryReport = (gallery: Gallery): GalleryReport =>
  pipe(gallery, computeGalleryClassNames, findGalleryIssues);

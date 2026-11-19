import type { Gallery } from '../types/gallery.ts';
import { computeClassNameOrigins } from './compute-class-name-origins.ts';
import { findGalleryClassNameUsages } from './find-gallery-class-name-usages.ts';
import type { GalleryClassNames } from './types/gallery-class-names.ts';

export const computeGalleryClassNames = (
  gallery: Gallery,
): GalleryClassNames => ({
  gallery,
  classNameOrigins: computeClassNameOrigins(
    findGalleryClassNameUsages(gallery),
  ),
});

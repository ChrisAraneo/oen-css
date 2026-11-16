import { filter, isString, isUndefined, keys, size } from 'lodash-es';
import type { GalleryReport } from '../types/gallery-report.ts';
import { findUnknownClassNames } from './find-unknown-class-names.ts';
import type { GalleryClassNames } from './types/gallery-class-names.ts';

export const findGalleryProblems = ({
  gallery,
  classNameOrigins,
}: GalleryClassNames): GalleryReport => ({
  renderedStoryCount: size(
    filter(gallery.renderedStories, (story) => isString(story.html)),
  ),
  storiesNeedingABrowserCount: size(
    filter(
      gallery.renderedStories,
      (story) => isUndefined(story.html) && isUndefined(story.problem),
    ),
  ),
  checkedClassNameCount: size(keys(classNameOrigins)),
  renderFailures: filter(gallery.renderedStories, (story) =>
    isString(story.problem),
  ),
  unknownClassNames: findUnknownClassNames(classNameOrigins, gallery),
});

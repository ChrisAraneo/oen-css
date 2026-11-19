import { flatMap } from 'lodash-es';
import type { Gallery } from '../types/gallery.ts';
import { findClassNameUsages } from './find-class-name-usages.ts';
import { toRepositoryRelativePath } from './to-repository-relative-path.ts';
import type { ClassNameUsage } from './types/class-name-usage.ts';

const NO_HTML = '';

export const findGalleryClassNameUsages = ({
  renderedStories,
  sources,
}: Gallery): readonly ClassNameUsage[] => [
  ...flatMap(renderedStories, (story) =>
    findClassNameUsages(story.html ?? NO_HTML, story.name),
  ),
  ...flatMap(sources, (source) =>
    findClassNameUsages(source.text, toRepositoryRelativePath(source.path)),
  ),
];

import { resolve } from 'node:path';
import { REPOSITORY_ROOT } from '../../../common/consts.ts';
import { OEN_STYLESHEET } from '../../../common/dist/consts.ts';
import { readDistFile } from '../../../common/dist/read-dist-file.ts';
import { readTextFile } from '../../../common/read-text-file.ts';
import type { Gallery } from '../types/gallery.ts';
import { readRenderedStories } from './read-rendered-stories.ts';
import { readStorySources } from './read-story-sources.ts';

const STORY_ONLY_STYLESHEET: string = resolve(
  REPOSITORY_ROOT,
  '.storybook',
  'storybook.css',
);

export const readGallery = (): Promise<Gallery> =>
  Promise.all([
    readRenderedStories(),
    readStorySources(),
    readDistFile(OEN_STYLESHEET),
    readTextFile(STORY_ONLY_STYLESHEET),
  ]).then(([renderedStories, sources, stylesheet, storyOnlyStylesheet]) => ({
    renderedStories,
    sources,
    stylesheet,
    storyOnlyStylesheet,
  }));

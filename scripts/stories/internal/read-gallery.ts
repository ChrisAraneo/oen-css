import { readTextFile } from '../../common/read-text-file.ts';
import { STORY_ONLY_STYLESHEET } from '../../consts.ts';
import { OEN_STYLESHEET } from '../../dist/consts.ts';
import { readDistFile } from '../../dist/read-dist-file.ts';
import type { Gallery } from '../types/gallery.ts';
import { readRenderedStories } from './read-rendered-stories.ts';
import { readStorySources } from './read-story-sources.ts';

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

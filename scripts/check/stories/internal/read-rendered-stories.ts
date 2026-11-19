import { flatten, map } from 'lodash-es';
import { STORIES_DIRECTORY } from '../../../common/consts.ts';
import type { RenderedStory } from '../types/rendered-story.ts';
import { findStoryFiles } from './find-story-files.ts';
import { readRenderedStoriesInFile } from './read-rendered-stories-in-file.ts';

const STORY_MODULE_EXTENSIONS: readonly string[] = Object.freeze([
  '.stories.js',
]);

export const readRenderedStories = (): Promise<readonly RenderedStory[]> =>
  findStoryFiles(STORIES_DIRECTORY, STORY_MODULE_EXTENSIONS)
    .then((files) =>
      Promise.all(map(files, (file) => readRenderedStoriesInFile(file))),
    )
    .then((rendered) => flatten(rendered));

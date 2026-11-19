import { map } from 'lodash-es';
import { STORIES_DIRECTORY } from '../../../common/consts.ts';
import { readTextFile } from '../../../common/read-text-file.ts';
import type { TextFile } from '../../../common/types/text-file.ts';
import { findStoryFiles } from './find-story-files.ts';

const STORY_SOURCE_EXTENSIONS: readonly string[] = Object.freeze([
  '.js',
  '.mdx',
]);

export const readStorySources = (): Promise<readonly TextFile[]> =>
  findStoryFiles(STORIES_DIRECTORY, STORY_SOURCE_EXTENSIONS).then((files) =>
    Promise.all(map(files, (file) => readTextFile(file))),
  );

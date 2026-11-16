import { map } from 'lodash-es';
import { readTextFile } from '../../common/read-text-file.ts';
import type { TextFile } from '../../common/types/text-file.ts';
import { STORIES_DIRECTORY } from '../../consts.ts';
import { STORY_SOURCE_EXTENSIONS } from '../consts.ts';
import { findStoryFiles } from './find-story-files.ts';

export const readStorySources = (): Promise<readonly TextFile[]> =>
  findStoryFiles(STORIES_DIRECTORY, STORY_SOURCE_EXTENSIONS).then((files) =>
    Promise.all(map(files, (file) => readTextFile(file))),
  );

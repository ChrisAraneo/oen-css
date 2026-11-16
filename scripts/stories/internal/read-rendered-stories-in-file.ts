import { map } from 'lodash-es';
import { formatErrorMessage } from '../../common/format-error-message.ts';
import type { RenderedStory } from '../types/rendered-story.ts';
import { findStoryExports } from './find-story-exports.ts';
import { readStoryModule } from './read-story-module.ts';
import { renderStoryExport } from './render-story-export.ts';
import { toRepositoryRelativePath } from './to-repository-relative-path.ts';

export const readRenderedStoriesInFile = (
  file: string,
): Promise<readonly RenderedStory[]> =>
  readStoryModule(file).then(
    (storyModule) =>
      map(findStoryExports(storyModule), (storyExport) =>
        renderStoryExport(file, storyExport),
      ),
    (error: unknown) => [
      {
        name: toRepositoryRelativePath(file),
        html: undefined,
        problem: formatErrorMessage(error),
      },
    ],
  );

import { compact, map, omit, toPairs } from 'lodash-es';
import { pipe } from 'remeda';
import { DEFAULT_EXPORT_NAME } from './consts.ts';
import { tryToStoryExport } from './try-to-story-export.ts';
import type { StoryExport } from './types/story-export.ts';
import type { StoryModule } from './types/story-module.ts';

export const findStoryExports = (
  storyModule: StoryModule,
): readonly StoryExport[] =>
  pipe(
    omit(storyModule, [DEFAULT_EXPORT_NAME]),
    (named) => toPairs(named),
    (pairs) =>
      map(pairs, ([exportName, story]) =>
        tryToStoryExport(exportName, story, storyModule.default),
      ),
    (candidates) => compact(candidates),
  );

import { assign, get, isFunction, isObjectLike } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import type { StoryExport } from './types/story-export.ts';
import type { StoryMeta } from './types/story-meta.ts';

export const tryToStoryExport = (
  exportName: string,
  story: unknown,
  meta: StoryMeta | undefined,
): StoryExport | undefined =>
  pipe(
    { story, render: get(story, 'render') ?? meta?.render },
    ({ story, render }) =>
      match(isObjectLike(story) && isFunction(render))
        .with(true, () => ({
          exportName,
          render,
          args: assign({}, meta?.args, get(story, 'args')),
        }))
        .otherwise(() => undefined),
  );

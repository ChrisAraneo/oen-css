import { isFunction } from 'lodash-es';
import { match } from 'ts-pattern';
import type { StoryArgs } from './types/story-args.ts';

export const runStoryRender = (render: unknown, args: StoryArgs): unknown =>
  match(render)
    .when(isFunction, (callable) => callable(args, { args }))
    .otherwise(() => undefined);

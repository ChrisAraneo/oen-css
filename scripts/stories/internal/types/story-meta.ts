import type { StoryArgs } from './story-args.ts';

export interface StoryMeta {
  readonly args?: StoryArgs;
  readonly render?: unknown;
}

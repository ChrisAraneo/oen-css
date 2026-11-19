import type { StoryMeta } from './story-meta.ts';

export type StoryModule = Record<string, unknown> & {
  readonly default?: StoryMeta;
};

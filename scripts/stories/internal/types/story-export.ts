import type { StoryArgs } from './story-args.ts';

export interface StoryExport {
  readonly exportName: string;
  readonly render: unknown;
  readonly args: StoryArgs;
}

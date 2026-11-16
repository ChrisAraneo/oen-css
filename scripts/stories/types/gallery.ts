import type { TextFile } from '../../common/types/text-file.ts';
import type { RenderedStory } from './rendered-story.ts';

export interface Gallery {
  readonly renderedStories: readonly RenderedStory[];
  readonly sources: readonly TextFile[];
  readonly stylesheet: TextFile;
  readonly storyOnlyStylesheet: TextFile;
}

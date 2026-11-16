import type { RenderedStory } from './rendered-story.ts';
import type { UnknownClassName } from './unknown-class-name.ts';

export interface GalleryReport {
  readonly renderedStoryCount: number;
  readonly storiesNeedingABrowserCount: number;
  readonly checkedClassNameCount: number;
  readonly renderFailures: readonly RenderedStory[];
  readonly unknownClassNames: readonly UnknownClassName[];
}

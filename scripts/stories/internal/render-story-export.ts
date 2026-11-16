import { assign } from 'lodash-es';
import type { RenderedStory } from '../types/rendered-story.ts';
import { toRepositoryRelativePath } from './to-repository-relative-path.ts';
import { tryRenderStoryHtml } from './try-render-story-html.ts';
import type { StoryExport } from './types/story-export.ts';

export const renderStoryExport = (
  file: string,
  { exportName, render, args }: StoryExport,
): RenderedStory =>
  assign(
    { name: `${toRepositoryRelativePath(file)} › ${exportName}` },
    tryRenderStoryHtml(render, args),
  );

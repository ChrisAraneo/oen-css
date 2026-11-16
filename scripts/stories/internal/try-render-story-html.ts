import { tryCatch } from 'ramda';
import { runStoryRender } from './run-story-render.ts';
import { toRenderProblem } from './to-render-problem.ts';
import { toRenderedHtml } from './to-rendered-html.ts';
import type { RenderedHtml } from './types/rendered-html.ts';
import type { StoryArgs } from './types/story-args.ts';

export const tryRenderStoryHtml: (
  render: unknown,
  args: StoryArgs,
) => RenderedHtml = tryCatch(
  (render: unknown, args: StoryArgs) =>
    toRenderedHtml(runStoryRender(render, args)),
  toRenderProblem,
);

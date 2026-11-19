import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { OEN_STYLESHEET } from '../../../common/dist/consts.ts';
import type { Gallery } from '../types/gallery.ts';
import type { UnknownClassName } from '../types/unknown-class-name.ts';
import { hasClassDeclaration } from './has-class-declaration.ts';
import { isStoryOnlyClassName } from './is-story-only-class-name.ts';

const STORY_ONLY_REASON = 'not declared in .storybook/storybook.css';

export const tryToUnknownClassName = (
  className: string,
  origins: readonly string[],
  { stylesheet, storyOnlyStylesheet }: Gallery,
): UnknownClassName | undefined =>
  pipe(
    match(isStoryOnlyClassName(className))
      .with(true, () => ({
        css: storyOnlyStylesheet.text,
        reason: STORY_ONLY_REASON,
      }))
      .otherwise(() => ({
        css: stylesheet.text,
        reason: `not in dist/${OEN_STYLESHEET}`,
      })),
    ({ css, reason }) =>
      match(hasClassDeclaration(css, className))
        .with(true, () => undefined)
        .otherwise(() => ({ className, origins, reason })),
  );

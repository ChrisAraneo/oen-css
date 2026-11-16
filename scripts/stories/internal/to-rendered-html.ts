import { P, match } from 'ts-pattern';
import { NEEDS_A_BROWSER } from './consts.ts';
import type { RenderedHtml } from './types/rendered-html.ts';

const { string } = P;

export const toRenderedHtml = (rendered: unknown): RenderedHtml =>
  match(rendered)
    .with(string, (html) => ({ html, problem: undefined }))
    .otherwise(() => NEEDS_A_BROWSER);

import type { RenderedHtml } from './types/rendered-html.ts';

export const DEFAULT_EXPORT_NAME = 'default';

export const NEEDS_A_BROWSER: RenderedHtml = Object.freeze({
  html: undefined,
  problem: undefined,
});

export const CLASS_ATTRIBUTE = /class="([^"]*)"/g;
export const WHITESPACE = /\s+/;

export const SELECTOR_BOUNDARIES: readonly string[] = Object.freeze([
  ' ',
  ',',
  ':',
  '.',
  '>',
  '{',
  ')',
  '\n',
]);

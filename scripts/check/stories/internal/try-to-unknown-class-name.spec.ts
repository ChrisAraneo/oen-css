import { describe, expect, it } from 'vitest';
import type { Gallery } from '../types/gallery.ts';
import { tryToUnknownClassName } from './try-to-unknown-class-name.ts';

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const gallery = (overrides: Partial<Gallery> = {}): Gallery => ({
  renderedStories: [],
  sources: [],
  stylesheet: file('.button{color:red}'),
  storyOnlyStylesheet: file('.sb-swatch{color:red}'),
  ...overrides,
});

describe('tryToUnknownClassName', () => {
  it('should return `undefined` when the built stylesheet declares the class', () => {
    expect(tryToUnknownClassName('button', ['a.js'], gallery())).toBe(
      undefined,
    );
  });

  it('should return the class, its origins, and the reason when the built stylesheet never declares it', () => {
    expect(tryToUnknownClassName('buton', ['a.js'], gallery())).toEqual({
      className: 'buton',
      origins: ['a.js'],
      reason: 'not in dist/oen.css',
    });
  });

  it('should return `undefined` when the gallery stylesheet declares the story only class', () => {
    expect(tryToUnknownClassName('sb-swatch', ['a.js'], gallery())).toBe(
      undefined,
    );
  });

  it('should return the gallery stylesheet as the reason when it never declares the story only class', () => {
    expect(tryToUnknownClassName('sb-typo', ['a.js'], gallery())).toEqual({
      className: 'sb-typo',
      origins: ['a.js'],
      reason: 'not declared in .storybook/storybook.css',
    });
  });

  it('should return the class as unknown when only the built stylesheet declares it', () => {
    expect(
      tryToUnknownClassName(
        'sb-only',
        ['a.js'],
        gallery({
          stylesheet: file('.sb-only{}'),
          storyOnlyStylesheet: file(''),
        }),
      ),
    ).toEqual({
      className: 'sb-only',
      origins: ['a.js'],
      reason: 'not declared in .storybook/storybook.css',
    });
  });

  it('should return every origin when the class was used in two files', () => {
    expect(
      tryToUnknownClassName('buton', ['a.js', 'b.js'], gallery())?.origins,
    ).toEqual(['a.js', 'b.js']);
  });
});

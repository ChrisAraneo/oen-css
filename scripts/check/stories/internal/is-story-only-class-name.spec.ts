import { describe, expect, it } from 'vitest';
import { isStoryOnlyClassName } from './is-story-only-class-name.ts';

describe('isStoryOnlyClassName', () => {
  it('should return `true` when the class starts with `sb-`', () => {
    expect(isStoryOnlyClassName('sb-swatch')).toBe(true);
  });

  it('should return `false` when the class is a Bulma class', () => {
    expect(isStoryOnlyClassName('button')).toBe(false);
  });

  it('should return `false` when the class contains `sb-` without starting with it', () => {
    expect(isStoryOnlyClassName('is-sb-like')).toBe(false);
  });

  it('should return `false` when the class name is empty', () => {
    expect(isStoryOnlyClassName('')).toBe(false);
  });
});

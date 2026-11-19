import { describe, expect, it } from 'vitest';
import { sliceStylesheetBanner } from './slice-stylesheet-banner.ts';

describe('sliceStylesheetBanner', () => {
  it('should return the first comment when the stylesheet starts with one', () => {
    expect(sliceStylesheetBanner('/*! oen */\nbody{}')).toBe('/*! oen */');
  });

  it('should return the charset and the banner when the charset comes first', () => {
    expect(sliceStylesheetBanner('@charset "UTF-8";\n/*! oen */\nbody{}')).toBe(
      '@charset "UTF-8";\n/*! oen */',
    );
  });

  it('should return the whole banner when it spans three lines', () => {
    expect(sliceStylesheetBanner('/*!\n * oen\n */\nbody{}')).toBe(
      '/*!\n * oen\n */',
    );
  });

  it('should return the first comment when the stylesheet carries a later one', () => {
    expect(sliceStylesheetBanner('/*! first */\nbody{}\n/*! second */')).toBe(
      '/*! first */',
    );
  });

  it('should return an empty string when the stylesheet has no comment', () => {
    expect(sliceStylesheetBanner('body{}')).toBe('');
  });

  it('should return an empty string when the stylesheet is empty', () => {
    expect(sliceStylesheetBanner('')).toBe('');
  });
});

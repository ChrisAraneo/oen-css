import { describe, expect, it } from 'vitest';
import { sliceArtifactBanner } from './slice-artifact-banner.ts';

describe('sliceArtifactBanner', () => {
  it('should return the first comment when the stylesheet starts with one', () => {
    expect(sliceArtifactBanner('/*! oen */\nbody{}')).toBe('/*! oen */');
  });

  it('should return the charset and the banner when the charset comes first', () => {
    expect(sliceArtifactBanner('@charset "UTF-8";\n/*! oen */\nbody{}')).toBe(
      '@charset "UTF-8";\n/*! oen */',
    );
  });

  it('should return the whole banner when it spans three lines', () => {
    expect(sliceArtifactBanner('/*!\n * oen\n */\nbody{}')).toBe(
      '/*!\n * oen\n */',
    );
  });

  it('should return the first comment when the stylesheet carries a later one', () => {
    expect(sliceArtifactBanner('/*! first */\nbody{}\n/*! second */')).toBe(
      '/*! first */',
    );
  });

  it('should return an empty string when the stylesheet has no comment', () => {
    expect(sliceArtifactBanner('body{}')).toBe('');
  });

  it('should return an empty string when the stylesheet is empty', () => {
    expect(sliceArtifactBanner('')).toBe('');
  });
});

import { describe, expect, it } from 'vitest';
import { formatMissingFragments } from './format-missing-fragments.ts';

describe('formatMissingFragments', () => {
  it('should return `undefined` when no fragment is missing', () => {
    expect(formatMissingFragments('oen.css', [])).toBe(undefined);
  });

  it('should return the file name and the missing fragment when one is missing', () => {
    expect(formatMissingFragments('oen.css', ['Bulma v'])).toBe(
      'oen.css banner is missing "Bulma v"',
    );
  });

  it('should return both fragments when two are missing', () => {
    expect(
      formatMissingFragments('oen.min.css', ['Bulma v', 'Copyright (c)']),
    ).toBe('oen.min.css banner is missing "Bulma v", "Copyright (c)"');
  });

  it('should return an issue naming the given file when a fragment is missing', () => {
    expect(formatMissingFragments('other.css', ['x'])).toContain('other.css');
  });
});

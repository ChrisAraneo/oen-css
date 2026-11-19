import { describe, expect, it } from 'vitest';
import { isStillInterpolated } from './is-still-interpolated.ts';

describe('isStillInterpolated', () => {
  it('should return `true` when the value holds an unresolved placeholder', () => {
    expect(isStillInterpolated('button is-${size}')).toBe(true);
  });

  it('should return `true` when the value holds a stray brace', () => {
    expect(isStillInterpolated('button {size}')).toBe(true);
  });

  it('should return `false` when the value is fully resolved', () => {
    expect(isStillInterpolated('button is-primary')).toBe(false);
  });

  it('should return `false` when the value is empty', () => {
    expect(isStillInterpolated('')).toBe(false);
  });

  it('should return `false` when the class names contain dashes and digits', () => {
    expect(isStillInterpolated('is-size-1 mt-2')).toBe(false);
  });
});

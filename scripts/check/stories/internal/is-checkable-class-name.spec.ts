import { describe, expect, it } from 'vitest';
import { isCheckableClassName } from './is-checkable-class-name.ts';

describe('isCheckableClassName', () => {
  it('should return `true` when the class is a Bulma class', () => {
    expect(isCheckableClassName('button')).toBe(true);
  });

  it('should return `false` when the class is a Font Awesome class', () => {
    expect(isCheckableClassName('fa-home')).toBe(false);
    expect(isCheckableClassName('fas')).toBe(false);
  });

  it('should return `false` when the class is `dropdown-trigger`', () => {
    expect(isCheckableClassName('dropdown-trigger')).toBe(false);
  });

  it('should return `true` when the class is a helper class', () => {
    expect(isCheckableClassName('is-primary')).toBe(true);
  });

  it('should return `true` when the class is a story only class', () => {
    expect(isCheckableClassName('sb-swatch')).toBe(true);
  });
});

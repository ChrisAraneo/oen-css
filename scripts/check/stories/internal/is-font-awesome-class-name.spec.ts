import { describe, expect, it } from 'vitest';
import { isFontAwesomeClassName } from './is-font-awesome-class-name.ts';

describe('isFontAwesomeClassName', () => {
  it('should return `true` when the class starts with `fa-`', () => {
    expect(isFontAwesomeClassName('fa-home')).toBe(true);
  });

  it('should return `true` when the class is `fas`, `far`, or `fab`', () => {
    expect(isFontAwesomeClassName('fas')).toBe(true);
    expect(isFontAwesomeClassName('far')).toBe(true);
    expect(isFontAwesomeClassName('fab')).toBe(true);
  });

  it('should return `false` when the class is a Bulma class', () => {
    expect(isFontAwesomeClassName('button')).toBe(false);
  });

  it('should return `false` when the class is `fancy`', () => {
    expect(isFontAwesomeClassName('fancy')).toBe(false);
  });

  it('should return `false` when the class is `fa`', () => {
    expect(isFontAwesomeClassName('fa')).toBe(false);
  });

  it('should return `false` when the class name is empty', () => {
    expect(isFontAwesomeClassName('')).toBe(false);
  });
});

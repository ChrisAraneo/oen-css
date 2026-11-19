import { describe, expect, it } from 'vitest';
import { toRem } from './to-rem.ts';

describe('toRem', () => {
  it('should return `1rem` when called with 16 pixels', () => {
    expect(toRem(16)).toBe('1rem');
  });

  it('should return `0.875rem` when called with 14 pixels', () => {
    expect(toRem(14)).toBe('0.875rem');
  });

  it('should return `1.75rem` when called with 28 pixels', () => {
    expect(toRem(28)).toBe('1.75rem');
  });

  it('should return `1.3125rem` when called with 21 pixels', () => {
    expect(toRem(21)).toBe('1.3125rem');
  });

  it('should return `0rem` when called with 0 pixels', () => {
    expect(toRem(0)).toBe('0rem');
  });
});

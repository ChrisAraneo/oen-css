import { describe, expect, it } from 'vitest';
import { toEm } from './to-em.ts';

describe('toEm', () => {
  it('should return `0.875em` when called with 14 pixels', () => {
    expect(toEm(14)).toBe('0.875em');
  });

  it('should return `1em` when called with 16 pixels', () => {
    expect(toEm(16)).toBe('1em');
  });

  it('should return `0.75em` when called with 12 pixels', () => {
    expect(toEm(12)).toBe('0.75em');
  });

  it('should return `1.5em` when called with 24 pixels', () => {
    expect(toEm(24)).toBe('1.5em');
  });

  it('should return `0em` when called with 0 pixels', () => {
    expect(toEm(0)).toBe('0em');
  });
});

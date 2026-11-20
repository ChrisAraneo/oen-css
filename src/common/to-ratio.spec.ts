import { describe, expect, it } from 'vitest';
import { toRatio } from './to-ratio.ts';

describe('toRatio', () => {
  it('should return `1.5` when called with 24 pixels against 16', () => {
    expect(toRatio(24, 16)).toBe('1.5');
  });

  it('should return `1.5714` when called with 22 pixels against 14', () => {
    expect(toRatio(22, 14)).toBe('1.5714');
  });

  it('should return `1` when the pixels match the basis', () => {
    expect(toRatio(16, 16)).toBe('1');
  });

  it('should return a value with no unit when called with 9 pixels against 14', () => {
    expect(toRatio(9, 14)).not.toMatch(/[a-z]/);
  });

  it('should return four decimal places when the ratio does not terminate', () => {
    expect(toRatio(10, 3).split('.')[1]).toHaveLength(4);
  });

  it('should return `0` when called with 0 pixels', () => {
    expect(toRatio(0, 14)).toBe('0');
  });
});

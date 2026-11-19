import { describe, expect, it } from 'vitest';
import { toUnitlessLineHeight } from './to-unitless-line-height.ts';

describe('toUnitlessLineHeight', () => {
  it('should return `1.5` when called with 24 pixels of line on 16', () => {
    expect(toUnitlessLineHeight(24, 16)).toBe('1.5');
  });

  it('should return `1.4286` when called with 20 pixels of line on 14', () => {
    expect(toUnitlessLineHeight(20, 14)).toBe('1.4286');
  });

  it('should return `1` when the line height matches the font size', () => {
    expect(toUnitlessLineHeight(16, 16)).toBe('1');
  });

  it('should return a value with no unit when called with 20 pixels of line on 14', () => {
    expect(toUnitlessLineHeight(20, 14)).not.toMatch(/[a-z]/);
  });

  it('should return four decimal places when the ratio does not terminate', () => {
    expect(toUnitlessLineHeight(10, 3).split('.')[1]).toHaveLength(4);
  });
});

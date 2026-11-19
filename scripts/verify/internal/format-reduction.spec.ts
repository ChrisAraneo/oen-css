import { describe, expect, it } from 'vitest';
import { formatReduction } from './format-reduction.ts';

describe('formatReduction', () => {
  it('should return `10.0` when 1000 bytes minify to 900', () => {
    expect(formatReduction(1000, 900)).toBe('10.0');
  });

  it('should return `0.0` when both sizes are equal', () => {
    expect(formatReduction(100, 100)).toBe('0.0');
  });

  it('should return `50.0` when the size halves', () => {
    expect(formatReduction(200, 100)).toBe('50.0');
  });

  it('should return `10.9` when the reduction rounds to one decimal place', () => {
    expect(formatReduction(730624, 651264)).toBe('10.9');
  });

  it('should return `-10.0` when the minified size is larger', () => {
    expect(formatReduction(100, 110)).toBe('-10.0');
  });
});

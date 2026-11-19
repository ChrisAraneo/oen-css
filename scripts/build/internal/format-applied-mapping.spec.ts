import { describe, expect, it } from 'vitest';
import { formatAppliedMapping } from './format-applied-mapping.ts';

describe('formatAppliedMapping', () => {
  it('should return the count and the description when the mapping renamed nine occurrences', () => {
    expect(formatAppliedMapping({ description: 'the prefix', count: 9 })).toBe(
      '  renamed     9x  the prefix',
    );
  });

  it('should return the count right aligned when the count is four digits', () => {
    expect(formatAppliedMapping({ description: 'x', count: 1416 })).toBe(
      '  renamed  1416x  x',
    );
  });

  it('should return `0x` when the mapping renamed nothing', () => {
    expect(formatAppliedMapping({ description: 'x', count: 0 })).toBe(
      '  renamed     0x  x',
    );
  });

  it('should return a line indented by two spaces when called with a mapping', () => {
    expect(
      formatAppliedMapping({ description: 'x', count: 1 }).startsWith('  '),
    ).toBe(true);
  });

  it('should return the whole count when the count is wider than the column', () => {
    expect(formatAppliedMapping({ description: 'x', count: 123456 })).toContain(
      '123456x',
    );
  });
});

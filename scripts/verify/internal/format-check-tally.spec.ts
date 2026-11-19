import { describe, expect, it } from 'vitest';
import { formatCheckTally } from './format-check-tally.ts';

describe('formatCheckTally', () => {
  it('should return `2/2 checks passed` when both checks passed', () => {
    expect(
      formatCheckTally([
        { name: 'a', detail: 'x', issue: undefined },
        { name: 'b', detail: 'y', issue: undefined },
      ]),
    ).toEqual(['', '2/2 checks passed']);
  });

  it('should return `1/2 checks passed` when one of two checks failed', () => {
    expect(
      formatCheckTally([
        { name: 'a', detail: 'x', issue: undefined },
        { name: 'b', detail: 'y', issue: 'broke' },
      ]),
    ).toEqual(['', '1/2 checks passed']);
  });

  it('should return `0/1 checks passed` when the only check failed', () => {
    expect(
      formatCheckTally([{ name: 'a', detail: 'x', issue: 'broke' }]),
    ).toEqual(['', '0/1 checks passed']);
  });

  it('should return `0/0 checks passed` when there are no checks', () => {
    expect(formatCheckTally([])).toEqual(['', '0/0 checks passed']);
  });

  it('should return a blank first line when there are no checks', () => {
    expect(formatCheckTally([]).at(0)).toBe('');
  });
});

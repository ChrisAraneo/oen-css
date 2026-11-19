import { describe, expect, it } from 'vitest';
import { formatStepSummary } from './format-step-summary.ts';

describe('formatStepSummary', () => {
  it('should return `2/2 steps passed` when both selected steps passed', () => {
    expect(
      formatStepSummary(
        [
          { name: 'format', succeeded: true },
          { name: 'typecheck', succeeded: true },
        ],
        2,
      ),
    ).toEqual(['', '2/2 steps passed']);
  });

  it('should return `1/2 steps passed` when one of two steps failed', () => {
    expect(
      formatStepSummary(
        [
          { name: 'format', succeeded: true },
          { name: 'typecheck', succeeded: false },
        ],
        2,
      ),
    ).toEqual(['', '1/2 steps passed']);
  });

  it('should return `0/6 steps passed` when one step of six ran and failed', () => {
    expect(
      formatStepSummary([{ name: 'format', succeeded: false }], 6),
    ).toEqual(['', '0/6 steps passed']);
  });

  it('should return `0/3 steps passed` when no step ran', () => {
    expect(formatStepSummary([], 3)).toEqual(['', '0/3 steps passed']);
  });

  it('should return a blank first line when called with no outcomes', () => {
    expect(formatStepSummary([], 1).at(0)).toBe('');
  });
});

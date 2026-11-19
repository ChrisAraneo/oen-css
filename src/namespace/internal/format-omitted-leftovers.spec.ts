import { range } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { MAX_REPORTED_LEFTOVERS } from './consts.ts';
import { formatOmittedLeftovers } from './format-omitted-leftovers.ts';

const leftovers = (count: number): readonly string[] =>
  range(count).map((index) => `  oen.css:${index}: --bulma-a`);

describe('formatOmittedLeftovers', () => {
  it('should return an empty string when the leftovers are exactly the reporting limit', () => {
    expect(formatOmittedLeftovers(leftovers(MAX_REPORTED_LEFTOVERS))).toBe('');
  });

  it('should return an empty string when there is one leftover', () => {
    expect(formatOmittedLeftovers(leftovers(1))).toBe('');
  });

  it('should return an empty string when there is no leftover', () => {
    expect(formatOmittedLeftovers([])).toBe('');
  });

  it('should return `and 1 more` when one leftover is past the reporting limit', () => {
    expect(formatOmittedLeftovers(leftovers(MAX_REPORTED_LEFTOVERS + 1))).toBe(
      '\n  ... and 1 more',
    );
  });

  it('should return `and 5 more` when five leftovers are past the reporting limit', () => {
    expect(formatOmittedLeftovers(leftovers(MAX_REPORTED_LEFTOVERS + 5))).toBe(
      '\n  ... and 5 more',
    );
  });
});

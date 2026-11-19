import { describe, expect, it } from 'vitest';
import { formatMissingSelectorsIssue } from './format-missing-selectors-issue.ts';

describe('formatMissingSelectorsIssue', () => {
  it('should return `undefined` when no selector is missing', () => {
    expect(formatMissingSelectorsIssue([])).toBe(undefined);
  });

  it('should return the missing selector when one is missing', () => {
    expect(formatMissingSelectorsIssue(['.button'])).toBe(
      'missing selectors: .button',
    );
  });

  it('should return both selectors when two are missing', () => {
    expect(formatMissingSelectorsIssue(['.button', '.navbar'])).toBe(
      'missing selectors: .button, .navbar',
    );
  });
});

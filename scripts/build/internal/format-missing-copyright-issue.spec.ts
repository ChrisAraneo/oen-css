import { describe, expect, it } from 'vitest';
import { formatMissingCopyrightIssue } from './format-missing-copyright-issue.ts';

describe('formatMissingCopyrightIssue', () => {
  it('should return `undefined` when a copyright line was found', () => {
    expect(
      formatMissingCopyrightIssue('Copyright (c) 2023 Jeremy Thomas'),
    ).toBe(undefined);
  });

  it('should return the missing copyright issue when the line is `undefined`', () => {
    expect(formatMissingCopyrightIssue(undefined)).toBe(
      'Could not find a "Copyright (c)" line in the license text.',
    );
  });

  it('should return `undefined` when the copyright line is an empty string', () => {
    expect(formatMissingCopyrightIssue('')).toBe(undefined);
  });

  it('should return an issue naming `Copyright (c)` when the line is `undefined`', () => {
    expect(formatMissingCopyrightIssue(undefined)).toContain('Copyright (c)');
  });
});

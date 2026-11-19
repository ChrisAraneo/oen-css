import { describe, expect, it } from 'vitest';
import { formatBuildIssues } from './format-build-issues.ts';

describe('formatBuildIssues', () => {
  it('should return the issue prefixed and padded with blank lines when called with one issue', () => {
    expect(formatBuildIssues(['it broke'])).toEqual([
      '',
      'Build failed: it broke',
      '',
    ]);
  });

  it('should return one line per issue when called with two issues', () => {
    expect(formatBuildIssues(['first', 'second'])).toEqual([
      '',
      'Build failed: first',
      'Build failed: second',
      '',
    ]);
  });

  it('should return two blank lines when called with no issues', () => {
    expect(formatBuildIssues([])).toEqual(['', '']);
  });

  it('should return one entry when the issue spans two lines', () => {
    expect(formatBuildIssues(['line one\nline two'])).toContain(
      'Build failed: line one\nline two',
    );
  });
});

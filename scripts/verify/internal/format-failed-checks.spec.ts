import { describe, expect, it } from 'vitest';
import { formatFailedChecks } from './format-failed-checks.ts';

describe('formatFailedChecks', () => {
  it('should return the check name and the issue indented beneath when a check failed', () => {
    expect(
      formatFailedChecks([
        {
          name: 'package artifacts are present',
          detail: 'x',
          issue: 'missing',
        },
      ]),
    ).toEqual(['  FAIL  package artifacts are present\n        missing']);
  });

  it('should return every issue line indented when the issue spans two lines', () => {
    expect(
      formatFailedChecks([{ name: 'a', detail: 'x', issue: 'first\nsecond' }]),
    ).toEqual(['  FAIL  a\n        first\n        second']);
  });

  it('should return an empty array when every check passed', () => {
    expect(
      formatFailedChecks([{ name: 'a', detail: 'x', issue: undefined }]),
    ).toEqual([]);
  });

  it('should return two lines when two checks failed', () => {
    expect(
      formatFailedChecks([
        { name: 'a', detail: 'x', issue: 'one' },
        { name: 'b', detail: 'y', issue: 'two' },
      ]),
    ).toHaveLength(2);
  });

  it('should not return the detail when a check failed', () => {
    expect(
      formatFailedChecks([
        { name: 'a', detail: 'the detail', issue: 'broke' },
      ]).join(''),
    ).not.toContain('the detail');
  });
});

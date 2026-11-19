import { describe, expect, it } from 'vitest';
import { filterFailedChecks } from './filter-failed-checks.ts';

describe('filterFailedChecks', () => {
  it('should return the check that reported an issue when one of two failed', () => {
    expect(
      filterFailedChecks([
        { name: 'a', detail: 'x', issue: undefined },
        { name: 'b', detail: 'y', issue: 'it broke' },
      ]),
    ).toEqual([{ name: 'b', detail: 'y', issue: 'it broke' }]);
  });

  it('should return an empty array when every check passed', () => {
    expect(
      filterFailedChecks([{ name: 'a', detail: 'x', issue: undefined }]),
    ).toEqual([]);
  });

  it('should return an empty array when there are no checks', () => {
    expect(filterFailedChecks([])).toEqual([]);
  });

  it('should return the check when its issue is an empty string', () => {
    expect(
      filterFailedChecks([{ name: 'a', detail: 'x', issue: '' }]),
    ).toHaveLength(1);
  });

  it('should return both checks when both failed', () => {
    expect(
      filterFailedChecks([
        { name: 'a', detail: 'x', issue: 'one' },
        { name: 'b', detail: 'y', issue: 'two' },
      ]),
    ).toHaveLength(2);
  });
});

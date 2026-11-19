import { describe, expect, it } from 'vitest';
import { formatPassedChecks } from './format-passed-checks.ts';

describe('formatPassedChecks', () => {
  it('should return the check name and its detail when the check passed', () => {
    expect(
      formatPassedChecks([
        {
          name: 'custom properties are namespaced with --oen-',
          detail: '1416 distinct properties',
          issue: undefined,
        },
      ]),
    ).toEqual([
      '  ok    custom properties are namespaced with --oen-: 1416 distinct properties',
    ]);
  });

  it('should return one line per check when both checks passed', () => {
    expect(
      formatPassedChecks([
        { name: 'a', detail: 'x', issue: undefined },
        { name: 'b', detail: 'y', issue: undefined },
      ]),
    ).toEqual(['  ok    a: x', '  ok    b: y']);
  });

  it('should return only the passed check when one of two failed', () => {
    expect(
      formatPassedChecks([
        { name: 'a', detail: 'x', issue: undefined },
        { name: 'b', detail: 'y', issue: 'broke' },
      ]),
    ).toEqual(['  ok    a: x']);
  });

  it('should return an empty array when there are no checks', () => {
    expect(formatPassedChecks([])).toEqual([]);
  });

  it('should return an empty array when the only check has an empty issue', () => {
    expect(formatPassedChecks([{ name: 'a', detail: 'x', issue: '' }])).toEqual(
      [],
    );
  });
});

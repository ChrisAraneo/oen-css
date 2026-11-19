import { describe, expect, it } from 'vitest';
import { filterUnthemedDifferences } from './filter-unthemed-differences.ts';

describe('filterUnthemedDifferences', () => {
  it('should return the difference when the theme does not explain it', () => {
    expect(
      filterUnthemedDifferences([
        { lineNumber: 1, ours: '.button {', theirs: '.buton {' },
      ]),
    ).toEqual([{ lineNumber: 1, ours: '.button {', theirs: '.buton {' }]);
  });

  it('should return an empty array when both lines are theme declarations', () => {
    expect(
      filterUnthemedDifferences([
        {
          lineNumber: 1,
          ours: '--bulma-primary: red;',
          theirs: '--bulma-primary: blue;',
        },
      ]),
    ).toEqual([]);
  });

  it('should return the difference when the line exists in only one stylesheet', () => {
    expect(
      filterUnthemedDifferences([
        { lineNumber: 1, ours: 'extra', theirs: undefined },
      ]),
    ).toHaveLength(1);
  });

  it('should return only the unexplained difference when one of two is a theme declaration', () => {
    expect(
      filterUnthemedDifferences([
        {
          lineNumber: 1,
          ours: '--bulma-primary: red;',
          theirs: '--bulma-primary: blue;',
        },
        { lineNumber: 2, ours: '.button {', theirs: '.buton {' },
      ]),
    ).toEqual([{ lineNumber: 2, ours: '.button {', theirs: '.buton {' }]);
  });

  it('should return an empty array when there are no differences', () => {
    expect(filterUnthemedDifferences([])).toEqual([]);
  });
});

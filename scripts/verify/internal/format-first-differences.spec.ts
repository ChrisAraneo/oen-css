import { range } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { formatFirstDifferences } from './format-first-differences.ts';

describe('formatFirstDifferences', () => {
  it('should return the line number and both lines when one line differs', () => {
    expect(
      formatFirstDifferences([
        { lineNumber: 7, ours: '--oen-a: 1', theirs: '--bulma-a: 1' },
      ]),
    ).toEqual(['  line 7:\n    oen: --oen-a: 1\n    bulma: --bulma-a: 1']);
  });

  it('should return `<eof>` for Bulma when we have an extra line', () => {
    expect(
      formatFirstDifferences([
        { lineNumber: 2, ours: 'extra', theirs: undefined },
      ]),
    ).toEqual(['  line 2:\n    oen: extra\n    bulma: <eof>']);
  });

  it('should return `<eof>` for Oen when they have an extra line', () => {
    expect(
      formatFirstDifferences([
        { lineNumber: 2, ours: undefined, theirs: 'extra' },
      ]),
    ).toEqual(['  line 2:\n    oen: <eof>\n    bulma: extra']);
  });

  it('should return five lines when there are ten differences', () => {
    expect(
      formatFirstDifferences(
        range(10).map((index) => ({
          lineNumber: index,
          ours: 'a',
          theirs: 'b',
        })),
      ),
    ).toHaveLength(5);
  });

  it('should return an empty array when there is no difference', () => {
    expect(formatFirstDifferences([])).toEqual([]);
  });
});

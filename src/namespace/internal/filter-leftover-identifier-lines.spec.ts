import { describe, expect, it } from 'vitest';
import { filterLeftoverIdentifierLines } from './filter-leftover-identifier-lines.ts';

describe('filterLeftoverIdentifierLines', () => {
  it('should return only the line that mentions bulma when one of two does', () => {
    expect(
      filterLeftoverIdentifierLines({
        fileName: 'oen.css',
        lines: [
          { line: '--oen-a: 1;', number: 1 },
          { line: '--bulma-b: 2;', number: 2 },
        ],
      }),
    ).toEqual({
      fileName: 'oen.css',
      lines: [{ line: '--bulma-b: 2;', number: 2 }],
    });
  });

  it('should return both lines when they mention bulma in different cases', () => {
    expect(
      filterLeftoverIdentifierLines({
        fileName: 'oen.css',
        lines: [
          { line: 'BULMA', number: 1 },
          { line: 'Bulma', number: 2 },
        ],
      }).lines,
    ).toHaveLength(2);
  });

  it('should return the line when bulma appears inside a url', () => {
    expect(
      filterLeftoverIdentifierLines({
        fileName: 'oen.css',
        lines: [{ line: '.foo { background: url(bulma.png) }', number: 3 }],
      }).lines,
    ).toHaveLength(1);
  });

  it('should return no lines when none mention bulma', () => {
    expect(
      filterLeftoverIdentifierLines({
        fileName: 'oen.css',
        lines: [{ line: '.button {}', number: 1 }],
      }).lines,
    ).toEqual([]);
  });

  it('should return the same file name when called with no line', () => {
    expect(
      filterLeftoverIdentifierLines({ fileName: 'oen.min.css', lines: [] })
        .fileName,
    ).toBe('oen.min.css');
  });
});

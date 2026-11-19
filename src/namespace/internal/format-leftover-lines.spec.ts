import { describe, expect, it } from 'vitest';
import { formatLeftoverLines } from './format-leftover-lines.ts';

describe('formatLeftoverLines', () => {
  it('should return an indented file, line number, and text reference when called with one line', () => {
    expect(
      formatLeftoverLines({
        fileName: 'oen.css',
        lines: [{ line: '--bulma-a: 1;', number: 7 }],
      }),
    ).toEqual(['  oen.css:7: --bulma-a: 1;']);
  });

  it('should return one reference per line when called with two lines', () => {
    expect(
      formatLeftoverLines({
        fileName: 'oen.css',
        lines: [
          { line: 'a', number: 1 },
          { line: 'b', number: 2 },
        ],
      }),
    ).toEqual(['  oen.css:1: a', '  oen.css:2: b']);
  });

  it('should return an empty array when there are no lines', () => {
    expect(formatLeftoverLines({ fileName: 'oen.css', lines: [] })).toEqual([]);
  });

  it('should return the file name on every reference when called with two lines', () => {
    expect(
      formatLeftoverLines({
        fileName: 'oen.min.css',
        lines: [
          { line: 'a', number: 1 },
          { line: 'b', number: 2 },
        ],
      }).every((reference) => reference.includes('oen.min.css')),
    ).toBe(true);
  });
});

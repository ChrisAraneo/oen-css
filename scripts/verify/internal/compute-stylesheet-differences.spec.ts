import { describe, expect, it } from 'vitest';
import { computeStylesheetDifferences } from './compute-stylesheet-differences.ts';

describe('computeStylesheetDifferences', () => {
  it('should return an empty array when the stylesheets are identical', () => {
    expect(computeStylesheetDifferences('a\nb', 'a\nb')).toEqual([]);
  });

  it('should return the line number, our line, and their line when one line differs', () => {
    expect(computeStylesheetDifferences('a\nb', 'a\nc')).toEqual([
      { lineNumber: 2, ours: 'b', theirs: 'c' },
    ]);
  });

  it('should return two differences when both lines differ', () => {
    expect(computeStylesheetDifferences('a\nb', 'x\ny')).toHaveLength(2);
  });

  it('should return `undefined` as their line when we have an extra line', () => {
    expect(computeStylesheetDifferences('a\nb', 'a')).toEqual([
      { lineNumber: 2, ours: 'b', theirs: undefined },
    ]);
  });

  it('should return `undefined` as our line when they have an extra line', () => {
    expect(computeStylesheetDifferences('a', 'a\nb')).toEqual([
      { lineNumber: 2, ours: undefined, theirs: 'b' },
    ]);
  });

  it('should return two differences when their stylesheet has two extra lines', () => {
    expect(computeStylesheetDifferences('a', 'a\nb\nc')).toHaveLength(2);
  });

  it('should return an empty array when both stylesheets are empty', () => {
    expect(computeStylesheetDifferences('', '')).toEqual([]);
  });

  it('should return one difference when the lines differ only by trailing whitespace', () => {
    expect(computeStylesheetDifferences('a ', 'a')).toHaveLength(1);
  });
});

import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { filterMatchingFile } from './filter-matching-file.ts';

const DIRECTORY = resolve('stories');

describe('filterMatchingFile', () => {
  it('should return the resolved path when the file name ends with the extension', () => {
    expect(
      filterMatchingFile(DIRECTORY, 'Theme.stories.js', ['.stories.js']),
    ).toEqual([resolve(DIRECTORY, 'Theme.stories.js')]);
  });

  it('should return the resolved path when the file name matches one of two extensions', () => {
    expect(
      filterMatchingFile(DIRECTORY, 'Introduction.mdx', ['.js', '.mdx']),
    ).toEqual([resolve(DIRECTORY, 'Introduction.mdx')]);
  });

  it('should return an empty array when the file name matches no extension', () => {
    expect(filterMatchingFile(DIRECTORY, 'notes.txt', ['.js'])).toEqual([]);
  });

  it('should return an empty array when only story modules are wanted', () => {
    expect(
      filterMatchingFile(DIRECTORY, 'helpers.js', ['.stories.js']),
    ).toEqual([]);
  });

  it('should return a path inside the given directory when the file name matches', () => {
    expect(filterMatchingFile(DIRECTORY, 'a.js', ['.js']).at(0)).toBe(
      resolve(DIRECTORY, 'a.js'),
    );
  });

  it('should return an empty array when no extension is wanted', () => {
    expect(filterMatchingFile(DIRECTORY, 'a.js', [])).toEqual([]);
  });
});

import { describe, expect, it } from 'vitest';
import { filterUnreadableDistFiles } from './filter-unreadable-dist-files.ts';

describe('filterUnreadableDistFiles', () => {
  it('should return the file that could not be read when one of two failed', () => {
    expect(
      filterUnreadableDistFiles([
        { path: 'dist/oen.css', text: 'body{}', issue: undefined },
        { path: 'dist/oen.min.css', text: '', issue: 'ENOENT' },
      ]),
    ).toEqual([{ path: 'dist/oen.min.css', text: '', issue: 'ENOENT' }]);
  });

  it('should return an empty array when every file was read', () => {
    expect(
      filterUnreadableDistFiles([
        { path: 'dist/oen.css', text: 'body{}', issue: undefined },
      ]),
    ).toEqual([]);
  });

  it('should return an empty array when there are no files', () => {
    expect(filterUnreadableDistFiles([])).toEqual([]);
  });

  it('should return an empty array when the file is empty but readable', () => {
    expect(
      filterUnreadableDistFiles([
        { path: 'dist/oen.css', text: '', issue: undefined },
      ]),
    ).toEqual([]);
  });

  it('should return both files when neither could be read', () => {
    expect(
      filterUnreadableDistFiles([
        { path: 'a', text: '', issue: 'ENOENT' },
        { path: 'b', text: '', issue: 'EACCES' },
      ]),
    ).toHaveLength(2);
  });
});

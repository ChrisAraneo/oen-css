import { describe, expect, it } from 'vitest';
import { filterUnreadablePackageFiles } from './filter-unreadable-package-files.ts';

describe('filterUnreadablePackageFiles', () => {
  it('should return the file that could not be read when one of two failed', () => {
    expect(
      filterUnreadablePackageFiles([
        { path: 'oen.css', text: 'body{}', issue: undefined },
        { path: 'oen.min.css', text: '', issue: 'ENOENT' },
      ]),
    ).toEqual([{ path: 'oen.min.css', text: '', issue: 'ENOENT' }]);
  });

  it('should return an empty array when every file was read', () => {
    expect(
      filterUnreadablePackageFiles([
        { path: 'oen.css', text: 'body{}', issue: undefined },
      ]),
    ).toEqual([]);
  });

  it('should return an empty array when there are no files', () => {
    expect(filterUnreadablePackageFiles([])).toEqual([]);
  });

  it('should return an empty array when the file is empty but readable', () => {
    expect(
      filterUnreadablePackageFiles([
        { path: 'oen.css', text: '', issue: undefined },
      ]),
    ).toEqual([]);
  });

  it('should return both files when neither could be read', () => {
    expect(
      filterUnreadablePackageFiles([
        { path: 'a', text: '', issue: 'ENOENT' },
        { path: 'b', text: '', issue: 'EACCES' },
      ]),
    ).toHaveLength(2);
  });
});

import { relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DIST_DIRECTORY, REPOSITORY_ROOT } from '../../common/consts.ts';
import { formatRemovedDirectories } from './format-removed-directories.ts';

describe('formatRemovedDirectories', () => {
  it('should return the directory relative to the repository when called with one directory', () => {
    expect(formatRemovedDirectories([DIST_DIRECTORY])).toBe('dist');
  });

  it('should return the directories separated by a comma when called with two', () => {
    expect(
      formatRemovedDirectories([
        DIST_DIRECTORY,
        resolve(REPOSITORY_ROOT, 'storybook-static'),
      ]),
    ).toBe('dist, storybook-static');
  });

  it('should return an empty string when called with no directory', () => {
    expect(formatRemovedDirectories([])).toBe('');
  });

  it('should not return the repository root when called with one directory', () => {
    expect(formatRemovedDirectories([DIST_DIRECTORY])).not.toContain(
      REPOSITORY_ROOT,
    );
  });

  it('should return the relative path when the directory is nested', () => {
    const nested = resolve(REPOSITORY_ROOT, 'dist', 'inner');

    expect(formatRemovedDirectories([nested])).toBe(
      relative(REPOSITORY_ROOT, nested),
    );
  });
});

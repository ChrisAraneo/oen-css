import { relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPOSITORY_ROOT } from '../../common/consts.ts';
import { formatRemovedPaths } from './format-removed-paths.ts';

const STYLESHEET = resolve(REPOSITORY_ROOT, 'oen.css');

describe('formatRemovedPaths', () => {
  it('should return the path relative to the repository when called with one path', () => {
    expect(formatRemovedPaths([STYLESHEET])).toBe('oen.css');
  });

  it('should return the paths separated by a comma when called with two', () => {
    expect(
      formatRemovedPaths([
        resolve(REPOSITORY_ROOT, 'storybook-static'),
        STYLESHEET,
      ]),
    ).toBe('storybook-static, oen.css');
  });

  it('should return an empty string when called with no path', () => {
    expect(formatRemovedPaths([])).toBe('');
  });

  it('should not return the repository root when called with one path', () => {
    expect(formatRemovedPaths([STYLESHEET])).not.toContain(REPOSITORY_ROOT);
  });

  it('should return the relative path when the path is nested', () => {
    const nested = resolve(REPOSITORY_ROOT, 'storybook-static', 'inner');

    expect(formatRemovedPaths([nested])).toBe(
      relative(REPOSITORY_ROOT, nested),
    );
  });
});

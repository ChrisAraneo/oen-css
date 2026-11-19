import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPOSITORY_ROOT } from '../../../common/consts.ts';
import { toRepositoryRelativePath } from './to-repository-relative-path.ts';

describe('toRepositoryRelativePath', () => {
  it('should return the path relative to the repository when called with an absolute path', () => {
    expect(
      toRepositoryRelativePath(
        resolve(REPOSITORY_ROOT, 'stories', 'Theme.stories.js'),
      ),
    ).toBe('stories/Theme.stories.js');
  });

  it('should return forward slashes when the path is nested', () => {
    expect(
      toRepositoryRelativePath(
        resolve(REPOSITORY_ROOT, 'stories', 'form', 'Input.stories.js'),
      ),
    ).toBe('stories/form/Input.stories.js');
  });

  it('should not return a backslash when the path is nested', () => {
    expect(
      toRepositoryRelativePath(resolve(REPOSITORY_ROOT, 'a', 'b', 'c.js')),
    ).not.toContain('\\');
  });

  it('should not return the repository root when called with an absolute path', () => {
    expect(
      toRepositoryRelativePath(resolve(REPOSITORY_ROOT, 'stories', 'a.js')),
    ).not.toContain(REPOSITORY_ROOT);
  });
});

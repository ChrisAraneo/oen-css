import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DIST_DIRECTORY } from '../../consts.ts';
import { toDistPath } from './to-dist-path.ts';

describe('toDistPath', () => {
  it('should return the path inside the dist directory when called with `oen.css`', () => {
    expect(toDistPath('oen.css')).toBe(resolve(DIST_DIRECTORY, 'oen.css'));
  });

  it('should return the path inside the dist directory when called with `oen.min.css`', () => {
    expect(toDistPath('oen.min.css')).toBe(
      resolve(DIST_DIRECTORY, 'oen.min.css'),
    );
  });

  it('should return the path inside the dist directory when called with `LICENSE-bulma`', () => {
    expect(toDistPath('LICENSE-bulma')).toBe(
      resolve(DIST_DIRECTORY, 'LICENSE-bulma'),
    );
  });

  it('should return a path that starts with the dist directory when called with `oen.css`', () => {
    expect(toDistPath('oen.css').startsWith(DIST_DIRECTORY)).toBe(true);
  });

  it('should return the file name as the last segment when called with the notices', () => {
    expect(toDistPath('THIRD-PARTY-NOTICES.md').endsWith('THIRD-PARTY-NOTICES.md')).toBe(
      true,
    );
  });
});

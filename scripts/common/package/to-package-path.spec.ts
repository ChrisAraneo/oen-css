import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPOSITORY_ROOT } from '../consts.ts';
import { toPackagePath } from './to-package-path.ts';

describe('toPackagePath', () => {
  it('should return the path inside the package root when called with `oen.css`', () => {
    expect(toPackagePath('oen.css')).toBe(resolve(REPOSITORY_ROOT, 'oen.css'));
  });

  it('should return the path inside the package root when called with `oen.min.css`', () => {
    expect(toPackagePath('oen.min.css')).toBe(
      resolve(REPOSITORY_ROOT, 'oen.min.css'),
    );
  });

  it('should return the path inside the package root when called with `LICENSE-bulma`', () => {
    expect(toPackagePath('LICENSE-bulma')).toBe(
      resolve(REPOSITORY_ROOT, 'LICENSE-bulma'),
    );
  });

  it('should return a path that starts with the package root when called with `oen.css`', () => {
    expect(toPackagePath('oen.css').startsWith(REPOSITORY_ROOT)).toBe(true);
  });

  it('should return the file name as the last segment when called with the notices', () => {
    expect(
      toPackagePath('THIRD_PARTY_NOTICES.md').endsWith(
        'THIRD_PARTY_NOTICES.md',
      ),
    ).toBe(true);
  });
});

import { describe, expect, it } from 'vitest';
import { toPackageFileNames } from './to-package-file-names.ts';

const file = (path: string) => ({ path, text: '', issue: undefined });

describe('toPackageFileNames', () => {
  it('should return the base name when called with one absolute path', () => {
    expect(toPackageFileNames([file('C:/repo/oen.css')])).toEqual(['oen.css']);
  });

  it('should return both base names when called with two paths', () => {
    expect(
      toPackageFileNames([file('/repo/oen.css'), file('/repo/LICENSE')]),
    ).toEqual(['oen.css', 'LICENSE']);
  });

  it('should return an empty array when called with no file', () => {
    expect(toPackageFileNames([])).toEqual([]);
  });

  it('should return `oen.min.css` when the file has a compound extension', () => {
    expect(toPackageFileNames([file('/repo/oen.min.css')])).toEqual([
      'oen.min.css',
    ]);
  });
});

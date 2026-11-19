import { describe, expect, it } from 'vitest';
import { toDistFileNames } from './to-dist-file-names.ts';

const file = (path: string) => ({ path, text: '', issue: undefined });

describe('toDistFileNames', () => {
  it('should return the base name when called with one absolute path', () => {
    expect(toDistFileNames([file('C:/repo/dist/oen.css')])).toEqual([
      'oen.css',
    ]);
  });

  it('should return both base names when called with two paths', () => {
    expect(
      toDistFileNames([file('/repo/dist/oen.css'), file('/repo/dist/LICENSE')]),
    ).toEqual(['oen.css', 'LICENSE']);
  });

  it('should return an empty array when called with no file', () => {
    expect(toDistFileNames([])).toEqual([]);
  });

  it('should return `oen.min.css` when the file has a compound extension', () => {
    expect(toDistFileNames([file('/repo/dist/oen.min.css')])).toEqual([
      'oen.min.css',
    ]);
  });
});

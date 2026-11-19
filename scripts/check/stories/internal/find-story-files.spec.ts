import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { findStoryFiles } from './find-story-files.ts';

vi.mock('node:fs/promises', () => ({ readdir: vi.fn() }));

const entry = (name: string, directory = false) => ({
  name,
  isDirectory: () => directory,
});

const ROOT = resolve('stories');

const readdirReturns = (
  tree: Record<string, readonly ReturnType<typeof entry>[]>,
): void => {
  vi.mocked(readdir).mockImplementation(
    (directory) => Promise.resolve(tree[String(directory)] ?? []) as never,
  );
};

describe('findStoryFiles', () => {
  it('should resolve with the matching file when the directory holds one match', async () => {
    readdirReturns({
      [ROOT]: [entry('Theme.stories.js'), entry('notes.txt')],
    });

    await expect(findStoryFiles(ROOT, ['.stories.js'])).resolves.toEqual([
      resolve(ROOT, 'Theme.stories.js'),
    ]);
  });

  it('should resolve with the file in the subdirectory when the directory holds one', async () => {
    readdirReturns({
      [ROOT]: [entry('form', true)],
      [resolve(ROOT, 'form')]: [entry('Input.stories.js')],
    });

    await expect(findStoryFiles(ROOT, ['.stories.js'])).resolves.toEqual([
      resolve(ROOT, 'form', 'Input.stories.js'),
    ]);
  });

  it('should resolve with two files when one is at the root and one in a subdirectory', async () => {
    readdirReturns({
      [ROOT]: [entry('Theme.stories.js'), entry('form', true)],
      [resolve(ROOT, 'form')]: [entry('Input.stories.js')],
    });

    await expect(findStoryFiles(ROOT, ['.stories.js'])).resolves.toHaveLength(
      2,
    );
  });

  it('should resolve with both files when two extensions are wanted', async () => {
    readdirReturns({
      [ROOT]: [entry('Introduction.mdx'), entry('helpers.js')],
    });

    await expect(findStoryFiles(ROOT, ['.js', '.mdx'])).resolves.toHaveLength(
      2,
    );
  });

  it('should resolve with an empty array when the directory is empty', async () => {
    readdirReturns({ [ROOT]: [] });

    await expect(findStoryFiles(ROOT, ['.js'])).resolves.toEqual([]);
  });

  it('should call `readdir` with `withFileTypes: true` when the directory is read', async () => {
    readdirReturns({ [ROOT]: [] });
    await findStoryFiles(ROOT, ['.js']);

    expect(readdir).toHaveBeenCalledWith(ROOT, { withFileTypes: true });
  });
});

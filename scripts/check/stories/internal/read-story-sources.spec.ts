import { beforeEach, describe, expect, it, vi } from 'vitest';
import { STORIES_DIRECTORY } from '../../../common/consts.ts';
import { readTextFile } from '../../../common/read-text-file.ts';
import { findStoryFiles } from './find-story-files.ts';
import { readStorySources } from './read-story-sources.ts';

vi.mock('./find-story-files.ts', () => ({ findStoryFiles: vi.fn() }));
vi.mock('../../../common/read-text-file.ts', () => ({
  readTextFile: vi.fn(),
}));

describe('readStorySources', () => {
  beforeEach(() => {
    vi.mocked(findStoryFiles).mockResolvedValue(['a.js']);
    vi.mocked(readTextFile).mockImplementation((path) =>
      Promise.resolve({
        path,
        text: '<a class="button"></a>',
        issue: undefined,
      }),
    );
  });

  it('should pass the stories directory, `.js`, and `.mdx` to `findStoryFiles` when the sources are read', async () => {
    await readStorySources();

    expect(findStoryFiles).toHaveBeenCalledWith(STORIES_DIRECTORY, [
      '.js',
      '.mdx',
    ]);
  });

  it('should resolve with the text of every source when two sources were found', async () => {
    vi.mocked(findStoryFiles).mockResolvedValue(['a.js', 'b.mdx']);

    await expect(readStorySources()).resolves.toEqual([
      { path: 'a.js', text: '<a class="button"></a>', issue: undefined },
      { path: 'b.mdx', text: '<a class="button"></a>', issue: undefined },
    ]);
  });

  it('should call `readTextFile` with the mdx source when an mdx file was found', async () => {
    vi.mocked(findStoryFiles).mockResolvedValue(['Introduction.mdx']);
    await readStorySources();

    expect(readTextFile).toHaveBeenCalledWith('Introduction.mdx');
  });

  it('should resolve with an empty array when no source was found', async () => {
    vi.mocked(findStoryFiles).mockResolvedValue([]);

    await expect(readStorySources()).resolves.toEqual([]);
  });

  it('should resolve with the read issue when a source could not be read', async () => {
    vi.mocked(readTextFile).mockResolvedValue({
      path: 'a.js',
      text: '',
      issue: 'a.js could not be read: ENOENT',
    });

    expect((await readStorySources()).at(0)?.issue).toBe(
      'a.js could not be read: ENOENT',
    );
  });
});

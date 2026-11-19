import { beforeEach, describe, expect, it, vi } from 'vitest';
import { STORIES_DIRECTORY } from '../../../common/consts.ts';
import { findStoryFiles } from './find-story-files.ts';
import { readRenderedStories } from './read-rendered-stories.ts';
import { readRenderedStoriesInFile } from './read-rendered-stories-in-file.ts';

vi.mock('./find-story-files.ts', () => ({ findStoryFiles: vi.fn() }));
vi.mock('./read-rendered-stories-in-file.ts', () => ({
  readRenderedStoriesInFile: vi.fn(),
}));

const story = (name: string) => ({ name, html: '<a></a>', issue: undefined });

describe('readRenderedStories', () => {
  beforeEach(() => {
    vi.mocked(findStoryFiles).mockResolvedValue(['a.stories.js']);
    vi.mocked(readRenderedStoriesInFile).mockResolvedValue([story('a › One')]);
  });

  it('should pass the stories directory and `.stories.js` to `findStoryFiles` when the stories are read', async () => {
    await readRenderedStories();

    expect(findStoryFiles).toHaveBeenCalledWith(STORIES_DIRECTORY, [
      '.stories.js',
    ]);
  });

  it('should call `readRenderedStoriesInFile` twice when two modules were found', async () => {
    vi.mocked(findStoryFiles).mockResolvedValue([
      'a.stories.js',
      'b.stories.js',
    ]);

    await readRenderedStories();

    expect(readRenderedStoriesInFile).toHaveBeenCalledTimes(2);
  });

  it('should resolve with three stories when the two modules render one and two', async () => {
    vi.mocked(findStoryFiles).mockResolvedValue([
      'a.stories.js',
      'b.stories.js',
    ]);
    vi.mocked(readRenderedStoriesInFile)
      .mockResolvedValueOnce([story('a › One')])
      .mockResolvedValueOnce([story('b › One'), story('b › Two')]);

    await expect(readRenderedStories()).resolves.toHaveLength(3);
  });

  it('should resolve with an empty array when no story module was found', async () => {
    vi.mocked(findStoryFiles).mockResolvedValue([]);

    await expect(readRenderedStories()).resolves.toEqual([]);
  });
});

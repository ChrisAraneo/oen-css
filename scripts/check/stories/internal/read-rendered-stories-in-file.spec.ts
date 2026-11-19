import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { REPOSITORY_ROOT } from '../../../common/consts.ts';
import { findStoryExports } from './find-story-exports.ts';
import { readRenderedStoriesInFile } from './read-rendered-stories-in-file.ts';
import { readStoryModule } from './read-story-module.ts';
import { renderStoryExport } from './render-story-export.ts';

vi.mock('./find-story-exports.ts', () => ({ findStoryExports: vi.fn() }));
vi.mock('./read-story-module.ts', () => ({ readStoryModule: vi.fn() }));
vi.mock('./render-story-export.ts', () => ({ renderStoryExport: vi.fn() }));

const FILE = resolve(REPOSITORY_ROOT, 'stories', 'Theme.stories.js');

const render = () => '<a></a>';

describe('readRenderedStoriesInFile', () => {
  beforeEach(() => {
    vi.mocked(readStoryModule).mockResolvedValue({ default: { render } });
    vi.mocked(findStoryExports).mockReturnValue([
      { exportName: 'Default', render, args: {} },
    ]);
    vi.mocked(renderStoryExport).mockReturnValue({
      name: 'stories/Theme.stories.js › Default',
      html: '<a></a>',
      issue: undefined,
    });
  });

  it('should resolve with one rendered story per export when the module exports one', async () => {
    await expect(readRenderedStoriesInFile(FILE)).resolves.toEqual([
      {
        name: 'stories/Theme.stories.js › Default',
        html: '<a></a>',
        issue: undefined,
      },
    ]);
  });

  it('should pass the file and the export to `renderStoryExport` when the module is read', async () => {
    await readRenderedStoriesInFile(FILE);

    expect(renderStoryExport).toHaveBeenCalledWith(FILE, {
      exportName: 'Default',
      render,
      args: {},
    });
  });

  it('should resolve with an empty array when the module exports no story', async () => {
    vi.mocked(findStoryExports).mockReturnValue([]);

    await expect(readRenderedStoriesInFile(FILE)).resolves.toEqual([]);
  });

  it('should resolve with one failed story when the module could not be imported', async () => {
    vi.mocked(readStoryModule).mockRejectedValue(
      new Error('Cannot find module'),
    );

    await expect(readRenderedStoriesInFile(FILE)).resolves.toEqual([
      {
        name: 'stories/Theme.stories.js',
        html: undefined,
        issue: 'Cannot find module',
      },
    ]);
  });

  it('should resolve with the repository relative path as the name when the import fails', async () => {
    vi.mocked(readStoryModule).mockRejectedValue(new Error('boom'));

    expect((await readRenderedStoriesInFile(FILE)).at(0)?.name).toBe(
      'stories/Theme.stories.js',
    );
  });

  it('should resolve with one story when the module rejects with a string', async () => {
    vi.mocked(readStoryModule).mockRejectedValue('a thrown string');

    await expect(readRenderedStoriesInFile(FILE)).resolves.toHaveLength(1);
  });
});

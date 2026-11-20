import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readPackageFile } from '../../../common/package/read-package-file.ts';
import { readTextFile } from '../../../common/read-text-file.ts';
import { readGallery } from './read-gallery.ts';
import { readRenderedStories } from './read-rendered-stories.ts';
import { readStorySources } from './read-story-sources.ts';

vi.mock('./read-rendered-stories.ts', () => ({
  readRenderedStories: vi.fn(),
}));
vi.mock('./read-story-sources.ts', () => ({ readStorySources: vi.fn() }));
vi.mock('../../../common/package/read-package-file.ts', () => ({
  readPackageFile: vi.fn(),
}));
vi.mock('../../../common/read-text-file.ts', () => ({
  readTextFile: vi.fn(),
}));

const STORY = { name: 'a › One', html: '<a></a>', issue: undefined };

describe('readGallery', () => {
  beforeEach(() => {
    vi.mocked(readRenderedStories).mockResolvedValue([STORY]);
    vi.mocked(readStorySources).mockResolvedValue([
      { path: 'a.js', text: 'source', issue: undefined },
    ]);
    vi.mocked(readPackageFile).mockResolvedValue({
      path: 'oen.css',
      text: '.button{}',
      issue: undefined,
    });
    vi.mocked(readTextFile).mockResolvedValue({
      path: '.storybook/storybook.css',
      text: '.sb-swatch{}',
      issue: undefined,
    });
  });

  it('should resolve with the rendered stories, the sources, and both stylesheets when the gallery is read', async () => {
    await expect(readGallery()).resolves.toEqual({
      renderedStories: [STORY],
      sources: [{ path: 'a.js', text: 'source', issue: undefined }],
      stylesheet: {
        path: 'oen.css',
        text: '.button{}',
        issue: undefined,
      },
      storyOnlyStylesheet: {
        path: '.storybook/storybook.css',
        text: '.sb-swatch{}',
        issue: undefined,
      },
    });
  });

  it('should call `readPackageFile` with `oen.css` when the gallery is read', async () => {
    await readGallery();

    expect(readPackageFile).toHaveBeenCalledWith('oen.css');
  });

  it('should call `readTextFile` with the Storybook stylesheet when the gallery is read', async () => {
    await readGallery();

    expect(readTextFile).toHaveBeenCalledWith(
      expect.stringContaining('storybook.css'),
    );
  });

  it('should call `readRenderedStories` and `readStorySources` once each when the gallery is read', async () => {
    await readGallery();

    expect(readRenderedStories).toHaveBeenCalledTimes(1);
    expect(readStorySources).toHaveBeenCalledTimes(1);
  });

  it('should resolve with the read issue when the built stylesheet could not be read', async () => {
    vi.mocked(readPackageFile).mockResolvedValue({
      path: 'oen.css',
      text: '',
      issue: 'oen.css could not be read: ENOENT',
    });

    expect((await readGallery()).stylesheet.issue).toBe(
      'oen.css could not be read: ENOENT',
    );
  });
});

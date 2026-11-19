import { beforeEach, describe, expect, it, vi } from 'vitest';
import { computeGalleryReport } from './compute-gallery-report.ts';
import { readGallery } from './internal/read-gallery.ts';
import { writeGalleryReport } from './internal/write-gallery-report.ts';
import { runStoriesCheck } from './run-stories-check.ts';
import type { GalleryReport } from './types/gallery-report.ts';
import type { Gallery } from './types/gallery.ts';

vi.mock('./compute-gallery-report.ts', () => ({
  computeGalleryReport: vi.fn(),
}));
vi.mock('./internal/read-gallery.ts', () => ({ readGallery: vi.fn() }));
vi.mock('./internal/write-gallery-report.ts', () => ({
  writeGalleryReport: vi.fn(),
}));

const GALLERY = { renderedStories: [] } as unknown as Gallery;

const REPORT = { renderedStoryCount: 183 } as GalleryReport;

describe('runStoriesCheck', () => {
  beforeEach(() => {
    vi.mocked(readGallery).mockResolvedValue(GALLERY);
    vi.mocked(computeGalleryReport).mockReturnValue(REPORT);
    vi.mocked(writeGalleryReport).mockReturnValue(true);
  });

  it('should pass the gallery to the report and the report to the writer when the check runs', async () => {
    await runStoriesCheck();

    expect(computeGalleryReport).toHaveBeenCalledWith(GALLERY);
    expect(writeGalleryReport).toHaveBeenCalledWith(REPORT);
  });

  it('should resolve with `true` when the report has no issue', async () => {
    await expect(runStoriesCheck()).resolves.toBe(true);
  });

  it('should resolve with `false` when the report found an issue', async () => {
    vi.mocked(writeGalleryReport).mockReturnValue(false);

    await expect(runStoriesCheck()).resolves.toBe(false);
  });

  it('should call `readGallery` once when the check runs', async () => {
    await runStoriesCheck();

    expect(readGallery).toHaveBeenCalledTimes(1);
  });

  it('should reject with the read error when the gallery cannot be read', async () => {
    vi.mocked(readGallery).mockRejectedValue(new Error('ENOENT'));

    await expect(runStoriesCheck()).rejects.toThrow('ENOENT');
  });
});

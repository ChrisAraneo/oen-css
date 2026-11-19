import { describe, expect, it, vi } from 'vitest';
import { writeIssueLines } from '../../../common/write-issue-lines.ts';
import { writeLines } from '../../../common/write-lines.ts';
import type { GalleryReport } from '../types/gallery-report.ts';
import { writeGalleryReport } from './write-gallery-report.ts';

vi.mock('../../../common/write-lines.ts', () => ({ writeLines: vi.fn() }));
vi.mock('../../../common/write-issue-lines.ts', () => ({
  writeIssueLines: vi.fn(),
}));

const report = (overrides: Partial<GalleryReport> = {}): GalleryReport => ({
  renderedStoryCount: 183,
  storiesNeedingBrowserCount: 6,
  checkedClassNameCount: 533,
  renderFailures: [],
  unknownClassNames: [],
  ...overrides,
});

describe('writeGalleryReport', () => {
  it('should return `true` when the report has no issue', () => {
    expect(writeGalleryReport(report())).toBe(true);
  });

  it('should return `false` when a class is unknown', () => {
    expect(
      writeGalleryReport(
        report({
          unknownClassNames: [
            { className: 'buton', origins: [], reason: 'missing' },
          ],
        }),
      ),
    ).toBe(false);
  });

  it('should return `false` when a story failed to render', () => {
    expect(
      writeGalleryReport(
        report({
          renderFailures: [{ name: 'a', html: undefined, issue: 'boom' }],
        }),
      ),
    ).toBe(false);
  });

  it('should pass the summary lines to `writeLines` when the report is written', () => {
    writeGalleryReport(report());

    expect(writeLines).toHaveBeenCalledWith([
      '  rendered 183 stories, skipped 6 that need a browser',
      '  checked 533 distinct classes used by the gallery',
    ]);
  });

  it('should pass the confirmation line to `writeLines` when the report has no issue', () => {
    writeGalleryReport(report());

    expect(writeLines).toHaveBeenCalledWith([
      '  every class exists in dist/oen.css or .storybook/storybook.css',
    ]);
  });

  it('should pass the issue lines to `writeIssueLines` when a class is unknown', () => {
    writeGalleryReport(
      report({
        unknownClassNames: [
          { className: 'buton', origins: ['a.js'], reason: 'not in dist' },
        ],
      }),
    );

    expect(writeIssueLines).toHaveBeenCalledWith([
      '  FAIL  .buton: not in dist\n        a.js',
    ]);
  });

  it('should pass an empty array to `writeLines` when a class is unknown', () => {
    writeGalleryReport(
      report({
        unknownClassNames: [
          { className: 'buton', origins: [], reason: 'missing' },
        ],
      }),
    );

    expect(writeLines).toHaveBeenCalledWith([]);
  });
});

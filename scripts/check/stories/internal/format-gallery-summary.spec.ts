import { describe, expect, it } from 'vitest';
import type { GalleryReport } from '../types/gallery-report.ts';
import { formatGallerySummary } from './format-gallery-summary.ts';

const report = (overrides: Partial<GalleryReport> = {}): GalleryReport => ({
  renderedStoryCount: 183,
  storiesNeedingBrowserCount: 6,
  checkedClassNameCount: 533,
  renderFailures: [],
  unknownClassNames: [],
  ...overrides,
});

describe('formatGallerySummary', () => {
  it('should return a first line naming the rendered and skipped counts when called with the report', () => {
    expect(formatGallerySummary(report()).at(0)).toBe(
      '  rendered 183 stories, skipped 6 that need a browser',
    );
  });

  it('should return a second line naming the checked class count when called with the report', () => {
    expect(formatGallerySummary(report()).at(1)).toBe(
      '  checked 533 distinct classes used by the gallery',
    );
  });

  it('should return two lines when called with the report', () => {
    expect(formatGallerySummary(report())).toHaveLength(2);
  });

  it('should return zero counts when every count in the report is zero', () => {
    expect(
      formatGallerySummary(
        report({
          renderedStoryCount: 0,
          storiesNeedingBrowserCount: 0,
          checkedClassNameCount: 0,
        }),
      ),
    ).toEqual([
      '  rendered 0 stories, skipped 0 that need a browser',
      '  checked 0 distinct classes used by the gallery',
    ]);
  });

  it('should return both lines indented by two spaces when called with the report', () => {
    expect(
      formatGallerySummary(report()).every((line) => line.startsWith('  ')),
    ).toBe(true);
  });
});

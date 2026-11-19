import { describe, expect, it } from 'vitest';
import type { GalleryReport } from '../types/gallery-report.ts';
import { hasGalleryIssues } from './has-gallery-issues.ts';

const report = (overrides: Partial<GalleryReport> = {}): GalleryReport => ({
  renderedStoryCount: 183,
  storiesNeedingBrowserCount: 6,
  checkedClassNameCount: 533,
  renderFailures: [],
  unknownClassNames: [],
  ...overrides,
});

describe('hasGalleryIssues', () => {
  it('should return `false` when the report has no render failure and no unknown class', () => {
    expect(hasGalleryIssues(report())).toBe(false);
  });

  it('should return `true` when a story failed to render', () => {
    expect(
      hasGalleryIssues(
        report({
          renderFailures: [
            { name: 'a › Default', html: undefined, issue: 'boom' },
          ],
        }),
      ),
    ).toBe(true);
  });

  it('should return `true` when a class is unknown', () => {
    expect(
      hasGalleryIssues(
        report({
          unknownClassNames: [
            { className: 'typo', origins: ['a'], reason: 'not in dist' },
          ],
        }),
      ),
    ).toBe(true);
  });

  it('should return `false` when six stories need a browser', () => {
    expect(hasGalleryIssues(report({ storiesNeedingBrowserCount: 6 }))).toBe(
      false,
    );
  });
});

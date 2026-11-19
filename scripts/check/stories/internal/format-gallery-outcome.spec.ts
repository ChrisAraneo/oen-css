import { describe, expect, it } from 'vitest';
import type { GalleryReport } from '../types/gallery-report.ts';
import { formatGalleryOutcome } from './format-gallery-outcome.ts';

const report = (overrides: Partial<GalleryReport> = {}): GalleryReport => ({
  renderedStoryCount: 183,
  storiesNeedingBrowserCount: 6,
  checkedClassNameCount: 533,
  renderFailures: [],
  unknownClassNames: [],
  ...overrides,
});

describe('formatGalleryOutcome', () => {
  it('should return one line confirming every class exists when the report has no issue', () => {
    expect(formatGalleryOutcome(report())).toEqual([
      '  every class exists in dist/oen.css or .storybook/storybook.css',
    ]);
  });

  it('should return a line naming both stylesheets when the report has no issue', () => {
    const outcome = formatGalleryOutcome(report()).join('');

    expect(outcome).toContain('dist/oen.css');
    expect(outcome).toContain('.storybook/storybook.css');
  });

  it('should return an empty array when a class is unknown', () => {
    expect(
      formatGalleryOutcome(
        report({
          unknownClassNames: [
            { className: 'buton', origins: [], reason: 'missing' },
          ],
        }),
      ),
    ).toEqual([]);
  });

  it('should return an empty array when a story failed to render', () => {
    expect(
      formatGalleryOutcome(
        report({
          renderFailures: [{ name: 'a', html: undefined, issue: 'boom' }],
        }),
      ),
    ).toEqual([]);
  });
});

import { describe, expect, it } from 'vitest';
import type { GalleryReport } from '../types/gallery-report.ts';
import { formatGalleryIssues } from './format-gallery-issues.ts';

const report = (overrides: Partial<GalleryReport> = {}): GalleryReport => ({
  renderedStoryCount: 0,
  storiesNeedingBrowserCount: 0,
  checkedClassNameCount: 0,
  renderFailures: [],
  unknownClassNames: [],
  ...overrides,
});

describe('formatGalleryIssues', () => {
  it('should return an empty array when the report has no issue', () => {
    expect(formatGalleryIssues(report())).toEqual([]);
  });

  it('should return the story name and the reason indented beneath when a story threw', () => {
    expect(
      formatGalleryIssues(
        report({
          renderFailures: [
            {
              name: 'stories/a.js › Default',
              html: undefined,
              issue: 'x is not a function',
            },
          ],
        }),
      ),
    ).toEqual([
      '  FAIL  stories/a.js › Default threw while rendering\n        x is not a function',
    ]);
  });

  it('should return the class, the reason, and the origin when a class is unknown', () => {
    expect(
      formatGalleryIssues(
        report({
          unknownClassNames: [
            {
              className: 'buton',
              origins: ['stories/a.js'],
              reason: 'not in dist/oen.css',
            },
          ],
        }),
      ),
    ).toEqual(['  FAIL  .buton: not in dist/oen.css\n        stories/a.js']);
  });

  it('should return at most four origins when the class has five', () => {
    const issue = formatGalleryIssues(
      report({
        unknownClassNames: [
          {
            className: 'buton',
            origins: [
              'origin-1',
              'origin-2',
              'origin-3',
              'origin-4',
              'origin-5',
            ],
            reason: 'not in dist/oen.css',
          },
        ],
      }),
    ).join('');

    expect(issue).toContain('origin-4');
    expect(issue).not.toContain('origin-5');
  });

  it('should return the render failure before the unknown class when the report has both', () => {
    expect(
      formatGalleryIssues(
        report({
          renderFailures: [{ name: 'a', html: undefined, issue: 'boom' }],
          unknownClassNames: [
            { className: 'b', origins: [], reason: 'missing' },
          ],
        }),
      ).map((line) => line.includes('threw')),
    ).toEqual([true, false]);
  });
});

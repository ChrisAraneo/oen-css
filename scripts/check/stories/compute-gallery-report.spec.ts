import { describe, expect, it } from 'vitest';
import { computeGalleryReport } from './compute-gallery-report.ts';
import type { Gallery } from './types/gallery.ts';

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const gallery = (overrides: Partial<Gallery> = {}): Gallery => ({
  renderedStories: [],
  sources: [],
  stylesheet: file('.button{color:red}.title{color:red}'),
  storyOnlyStylesheet: file('.sb-swatch{color:red}'),
  ...overrides,
});

describe('computeGalleryReport', () => {
  it('should return a report with no issues when every class used is declared', () => {
    expect(
      computeGalleryReport(
        gallery({
          renderedStories: [
            {
              name: 'stories/a.js › Default',
              html: '<a class="button title"></a>',
              issue: undefined,
            },
          ],
        }),
      ),
    ).toEqual({
      renderedStoryCount: 1,
      storiesNeedingBrowserCount: 0,
      checkedClassNameCount: 2,
      renderFailures: [],
      unknownClassNames: [],
    });
  });

  it('should return the unknown class with its origin when no stylesheet declares it', () => {
    expect(
      computeGalleryReport(
        gallery({
          renderedStories: [
            {
              name: 'a › Default',
              html: '<a class="buton"></a>',
              issue: undefined,
            },
          ],
        }),
      ).unknownClassNames,
    ).toEqual([
      {
        className: 'buton',
        origins: ['a › Default'],
        reason: 'not in dist/oen.css',
      },
    ]);
  });

  it('should return one render failure when a story threw while rendering', () => {
    expect(
      computeGalleryReport(
        gallery({
          renderedStories: [
            { name: 'a', html: undefined, issue: 'x is not a function' },
          ],
        }),
      ).renderFailures,
    ).toHaveLength(1);
  });

  it('should return the story as needing a browser when it rendered no html and reported no issue', () => {
    const report = computeGalleryReport(
      gallery({
        renderedStories: [{ name: 'a', html: undefined, issue: undefined }],
      }),
    );

    expect(report.storiesNeedingBrowserCount).toBe(1);
    expect(report.renderFailures).toEqual([]);
  });

  it('should return the unknown class when a story source uses it', () => {
    expect(
      computeGalleryReport(
        gallery({ sources: [file('<p class="buton"></p>')] }),
      ).unknownClassNames.map(({ className }) => className),
    ).toEqual(['buton']);
  });

  it('should return zero counts and no issues when the gallery is empty', () => {
    expect(computeGalleryReport(gallery())).toEqual({
      renderedStoryCount: 0,
      storiesNeedingBrowserCount: 0,
      checkedClassNameCount: 0,
      renderFailures: [],
      unknownClassNames: [],
    });
  });
});

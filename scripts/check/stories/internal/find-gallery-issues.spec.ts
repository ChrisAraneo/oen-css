import { describe, expect, it } from 'vitest';
import type { Gallery } from '../types/gallery.ts';
import { findGalleryIssues } from './find-gallery-issues.ts';

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const gallery = (overrides: Partial<Gallery> = {}): Gallery => ({
  renderedStories: [],
  sources: [],
  stylesheet: file('.button{color:red}'),
  storyOnlyStylesheet: file(''),
  ...overrides,
});

describe('findGalleryIssues', () => {
  it('should return a rendered story count of 1 when one of two stories rendered html', () => {
    expect(
      findGalleryIssues({
        gallery: gallery({
          renderedStories: [
            { name: 'a', html: '<a></a>', issue: undefined },
            { name: 'b', html: undefined, issue: undefined },
          ],
        }),
        classNameOrigins: {},
      }).renderedStoryCount,
    ).toBe(1);
  });

  it('should return one story as needing a browser and one as a render failure when neither rendered html', () => {
    const report = findGalleryIssues({
      gallery: gallery({
        renderedStories: [
          { name: 'a', html: undefined, issue: undefined },
          { name: 'b', html: undefined, issue: 'boom' },
        ],
      }),
      classNameOrigins: {},
    });

    expect(report.storiesNeedingBrowserCount).toBe(1);
    expect(report.renderFailures).toEqual([
      { name: 'b', html: undefined, issue: 'boom' },
    ]);
  });

  it('should return a checked class count of 2 when two classes were used', () => {
    expect(
      findGalleryIssues({
        gallery: gallery(),
        classNameOrigins: { button: ['a'], title: ['a'] },
      }).checkedClassNameCount,
    ).toBe(2);
  });

  it('should return the unknown class with its origin when no stylesheet declares it', () => {
    expect(
      findGalleryIssues({
        gallery: gallery(),
        classNameOrigins: { buton: ['a.js'] },
      }).unknownClassNames,
    ).toEqual([
      { className: 'buton', origins: ['a.js'], reason: 'not in dist/oen.css' },
    ]);
  });

  it('should return no render failures and no unknown classes when every class is declared', () => {
    expect(
      findGalleryIssues({
        gallery: gallery({
          renderedStories: [
            { name: 'a', html: '<a class="button"></a>', issue: undefined },
          ],
        }),
        classNameOrigins: { button: ['a'] },
      }),
    ).toEqual({
      renderedStoryCount: 1,
      storiesNeedingBrowserCount: 0,
      checkedClassNameCount: 1,
      renderFailures: [],
      unknownClassNames: [],
    });
  });
});

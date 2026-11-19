import { describe, expect, it } from 'vitest';
import type { Gallery } from '../types/gallery.ts';
import { computeGalleryClassNames } from './compute-gallery-class-names.ts';

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const gallery = (overrides: Partial<Gallery> = {}): Gallery => ({
  renderedStories: [],
  sources: [],
  stylesheet: file(''),
  storyOnlyStylesheet: file(''),
  ...overrides,
});

describe('computeGalleryClassNames', () => {
  it('should return the class mapped to the story that uses it when one story renders it', () => {
    expect(
      computeGalleryClassNames(
        gallery({
          renderedStories: [
            { name: 'a', html: '<a class="button"></a>', issue: undefined },
          ],
        }),
      ).classNameOrigins,
    ).toEqual({ button: ['a'] });
  });

  it('should return both stories as origins when two stories use the same class', () => {
    expect(
      computeGalleryClassNames(
        gallery({
          renderedStories: [
            { name: 'a', html: '<a class="button"></a>', issue: undefined },
            { name: 'b', html: '<a class="button"></a>', issue: undefined },
          ],
        }),
      ).classNameOrigins,
    ).toEqual({ button: ['a', 'b'] });
  });

  it('should return the same gallery when called with it', () => {
    const given = gallery();

    expect(computeGalleryClassNames(given).gallery).toBe(given);
  });

  it('should return no class origins when the gallery is empty', () => {
    expect(computeGalleryClassNames(gallery()).classNameOrigins).toEqual({});
  });
});

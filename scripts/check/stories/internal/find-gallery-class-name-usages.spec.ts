import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPOSITORY_ROOT } from '../../../common/consts.ts';
import type { Gallery } from '../types/gallery.ts';
import { findGalleryClassNameUsages } from './find-gallery-class-name-usages.ts';

const file = (text: string, path = 'p') => ({ path, text, issue: undefined });

const gallery = (overrides: Partial<Gallery> = {}): Gallery => ({
  renderedStories: [],
  sources: [],
  stylesheet: file(''),
  storyOnlyStylesheet: file(''),
  ...overrides,
});

describe('findGalleryClassNameUsages', () => {
  it('should return the class with the story name as its origin when a story rendered html', () => {
    expect(
      findGalleryClassNameUsages(
        gallery({
          renderedStories: [
            {
              name: 'stories/a.js › Default',
              html: '<a class="button"></a>',
              issue: undefined,
            },
          ],
        }),
      ),
    ).toEqual([{ className: 'button', origin: 'stories/a.js › Default' }]);
  });

  it('should return the class with the repository relative path as its origin when a source uses it', () => {
    expect(
      findGalleryClassNameUsages(
        gallery({
          sources: [
            file(
              '<p class="title"></p>',
              resolve(REPOSITORY_ROOT, 'stories', 'a.js'),
            ),
          ],
        }),
      ),
    ).toEqual([{ className: 'title', origin: 'stories/a.js' }]);
  });

  it('should return the classes of the rendered story and the source when both use one', () => {
    expect(
      findGalleryClassNameUsages(
        gallery({
          renderedStories: [
            { name: 'a', html: '<a class="button"></a>', issue: undefined },
          ],
          sources: [file('<p class="title"></p>')],
        }),
      ).map(({ className }) => className),
    ).toEqual(['button', 'title']);
  });

  it('should return an empty array when the story rendered no html', () => {
    expect(
      findGalleryClassNameUsages(
        gallery({
          renderedStories: [
            { name: 'a', html: undefined, issue: 'needs a browser' },
          ],
        }),
      ),
    ).toEqual([]);
  });

  it('should return an empty array when the gallery is empty', () => {
    expect(findGalleryClassNameUsages(gallery())).toEqual([]);
  });
});

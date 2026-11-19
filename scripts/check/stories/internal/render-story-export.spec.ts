import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPOSITORY_ROOT } from '../../../common/consts.ts';
import { renderStoryExport } from './render-story-export.ts';

const FILE = resolve(REPOSITORY_ROOT, 'stories', 'Theme.stories.js');

describe('renderStoryExport', () => {
  it('should return the file path and the export name as the story name when the story renders', () => {
    expect(
      renderStoryExport(FILE, {
        exportName: 'Default',
        render: () => '<a></a>',
        args: {},
      }).name,
    ).toBe('stories/Theme.stories.js › Default');
  });

  it('should return the rendered html when the story renders', () => {
    expect(
      renderStoryExport(FILE, {
        exportName: 'Default',
        render: () => '<a class="button"></a>',
        args: {},
      }),
    ).toEqual({
      name: 'stories/Theme.stories.js › Default',
      html: '<a class="button"></a>',
      issue: undefined,
    });
  });

  it('should return html built from the args when the story declares them', () => {
    expect(
      renderStoryExport(FILE, {
        exportName: 'Large',
        render: ({ size }: { size: string }) => `<a class="${size}"></a>`,
        args: { size: 'is-large' },
      }).html,
    ).toBe('<a class="is-large"></a>');
  });

  it('should return the story name and the error as the issue when the render throws', () => {
    expect(
      renderStoryExport(FILE, {
        exportName: 'Broken',
        render: () => {
          throw new Error('x is not a function');
        },
        args: {},
      }),
    ).toEqual({
      name: 'stories/Theme.stories.js › Broken',
      html: undefined,
      issue: 'x is not a function',
    });
  });

  it('should return `undefined` as the issue when the render throws `document is not defined`', () => {
    expect(
      renderStoryExport(FILE, {
        exportName: 'NeedsBrowser',
        render: () => {
          throw new Error('document is not defined');
        },
        args: {},
      }).issue,
    ).toBe(undefined);
  });
});

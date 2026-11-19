import { describe, expect, it } from 'vitest';
import { tryRenderStoryHtml } from './try-render-story-html.ts';

describe('tryRenderStoryHtml', () => {
  it('should return the html and no issue when the render returns a string', () => {
    expect(tryRenderStoryHtml(() => '<a class="button"></a>', {})).toEqual({
      html: '<a class="button"></a>',
      issue: undefined,
    });
  });

  it('should return html built from the args when the render reads them', () => {
    expect(
      tryRenderStoryHtml(({ label }: { label: string }) => `<a>${label}</a>`, {
        label: 'Save',
      }),
    ).toEqual({ html: '<a>Save</a>', issue: undefined });
  });

  it('should return the error message as the issue when the render throws', () => {
    expect(
      tryRenderStoryHtml(() => {
        throw new Error('x is not a function');
      }, {}),
    ).toEqual({ html: undefined, issue: 'x is not a function' });
  });

  it('should return no html and no issue when the render throws `document is not defined`', () => {
    expect(
      tryRenderStoryHtml(() => {
        throw new Error('document is not defined');
      }, {}),
    ).toEqual({ html: undefined, issue: undefined });
  });

  it('should return no html and no issue when the render returns a DOM node', () => {
    expect(tryRenderStoryHtml(() => ({ tagName: 'DIV' }), {})).toEqual({
      html: undefined,
      issue: undefined,
    });
  });

  it('should return no html and no issue when the render is `undefined`', () => {
    expect(tryRenderStoryHtml(undefined, {})).toEqual({
      html: undefined,
      issue: undefined,
    });
  });
});

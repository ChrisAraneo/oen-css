import { describe, expect, it } from 'vitest';
import { toRenderedHtml } from './to-rendered-html.ts';

describe('toRenderedHtml', () => {
  it('should return the html and no issue when the story rendered a string', () => {
    expect(toRenderedHtml('<a class="button"></a>')).toEqual({
      html: '<a class="button"></a>',
      issue: undefined,
    });
  });

  it('should return an empty string as the html when the story rendered one', () => {
    expect(toRenderedHtml('')).toEqual({ html: '', issue: undefined });
  });

  it('should return no html and no issue when the story rendered a DOM node', () => {
    expect(toRenderedHtml({ tagName: 'DIV' })).toEqual({
      html: undefined,
      issue: undefined,
    });
  });

  it('should return no html and no issue when the story rendered `undefined`', () => {
    expect(toRenderedHtml(undefined)).toEqual({
      html: undefined,
      issue: undefined,
    });
  });

  it('should return `undefined` as the issue when the story rendered a number', () => {
    expect(toRenderedHtml(42).issue).toBe(undefined);
  });
});

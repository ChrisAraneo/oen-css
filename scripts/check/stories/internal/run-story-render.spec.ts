import { describe, expect, it, vi } from 'vitest';
import { runStoryRender } from './run-story-render.ts';

describe('runStoryRender', () => {
  it('should return the html the render function produced when the render is callable', () => {
    expect(runStoryRender(() => '<a class="button"></a>', {})).toBe(
      '<a class="button"></a>',
    );
  });

  it('should pass the args and the context to the render function when the render is callable', () => {
    const render = vi.fn(() => '');
    runStoryRender(render, { size: 'is-large' });

    expect(render).toHaveBeenCalledWith(
      { size: 'is-large' },
      { args: { size: 'is-large' } },
    );
  });

  it('should return html read from the context args when the render reads them', () => {
    expect(
      runStoryRender(
        (_args: unknown, context: { args: Record<string, unknown> }) =>
          context.args['label'],
        { label: 'Save' },
      ),
    ).toBe('Save');
  });

  it('should return `undefined` when the render is `undefined`', () => {
    expect(runStoryRender(undefined, {})).toBe(undefined);
  });

  it('should return `undefined` when the render is not a function', () => {
    expect(runStoryRender('<a></a>', {})).toBe(undefined);
  });

  it('should throw the render error when the render function throws', () => {
    expect(() =>
      runStoryRender(() => {
        throw new Error('document is not defined');
      }, {}),
    ).toThrow('document is not defined');
  });
});

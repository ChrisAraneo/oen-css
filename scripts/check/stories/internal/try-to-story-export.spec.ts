import { describe, expect, it } from 'vitest';
import { tryToStoryExport } from './try-to-story-export.ts';

const render = () => '<a></a>';

describe('tryToStoryExport', () => {
  it('should return the export name, the render, and empty args when the story carries its own render', () => {
    expect(tryToStoryExport('Default', { render }, undefined)).toEqual({
      exportName: 'Default',
      render,
      args: {},
    });
  });

  it('should return the meta render when the story carries none', () => {
    expect(tryToStoryExport('Default', {}, { render })).toEqual({
      exportName: 'Default',
      render,
      args: {},
    });
  });

  it('should return the story render when both the story and the meta carry one', () => {
    const own = () => '<b></b>';

    expect(
      tryToStoryExport('Default', { render: own }, { render })?.render,
    ).toBe(own);
  });

  it('should return the meta args merged with the story args when both declare them', () => {
    expect(
      tryToStoryExport(
        'Large',
        { args: { size: 'is-large' } },
        { render, args: { label: 'Save' } },
      )?.args,
    ).toEqual({ label: 'Save', size: 'is-large' });
  });

  it('should return the story args when both declare the same key', () => {
    expect(
      tryToStoryExport(
        'Large',
        { args: { label: 'Cancel' } },
        { render, args: { label: 'Save' } },
      )?.args,
    ).toEqual({ label: 'Cancel' });
  });

  it('should return `undefined` when neither the story nor the meta carries a render', () => {
    expect(tryToStoryExport('Default', {}, undefined)).toBe(undefined);
  });

  it('should return `undefined` when the export is a string', () => {
    expect(tryToStoryExport('title', 'Buttons', { render })).toBe(undefined);
  });

  it('should return `undefined` when the render is not a function', () => {
    expect(tryToStoryExport('Default', { render: '<a></a>' }, undefined)).toBe(
      undefined,
    );
  });
});

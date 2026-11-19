import { describe, expect, it } from 'vitest';
import { findStoryExports } from './find-story-exports.ts';

const render = () => '<a></a>';

describe('findStoryExports', () => {
  it('should return the named story exports when the module has two', () => {
    expect(
      findStoryExports({ default: { render }, Default: {}, Large: {} }).map(
        ({ exportName }) => exportName,
      ),
    ).toEqual(['Default', 'Large']);
  });

  it('should not return the default export when the module has one', () => {
    expect(
      findStoryExports({ default: { render }, Default: {} }).map(
        ({ exportName }) => exportName,
      ),
    ).not.toContain('default');
  });

  it('should return the story with the meta args when the meta declares them', () => {
    expect(
      findStoryExports({
        default: { render, args: { label: 'Save' } },
        Default: {},
      }),
    ).toEqual([{ exportName: 'Default', render, args: { label: 'Save' } }]);
  });

  it('should return one story when the module also exports a title', () => {
    expect(
      findStoryExports({ default: { render }, title: 'Buttons', Default: {} }),
    ).toHaveLength(1);
  });

  it('should return an empty array when the module exports only the meta', () => {
    expect(findStoryExports({ default: { render } })).toEqual([]);
  });

  it('should return an empty array when the module is empty', () => {
    expect(findStoryExports({})).toEqual([]);
  });
});

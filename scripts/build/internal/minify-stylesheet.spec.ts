import { describe, expect, it } from 'vitest';
import { minifyStylesheet } from './minify-stylesheet.ts';

describe('minifyStylesheet', () => {
  it('should return the minified css, no warnings, and no issue when the stylesheet minifies cleanly', () => {
    expect(minifyStylesheet('body { color: red; }', 'oen.min.css')).toEqual({
      css: 'body{color:red}',
      warnings: [],
      issue: undefined,
    });
  });

  it('should return css shorter than the input when the stylesheet has whitespace to remove', () => {
    const css = '.a { color: red; }\n\n.b { color: blue; }\n';

    expect(minifyStylesheet(css, 'oen.min.css').css.length).toBeLessThan(
      css.length,
    );
  });

  it('should return css that keeps the license comment when the stylesheet contains one', () => {
    expect(
      minifyStylesheet('/*! keep me */\nbody { color: red; }', 'oen.min.css')
        .css,
    ).toContain('/*! keep me */');
  });

  it('should return css without the ordinary comment when the stylesheet contains one', () => {
    expect(
      minifyStylesheet('/* drop me */\nbody { color: red; }', 'oen.min.css')
        .css,
    ).not.toContain('drop me');
  });

  it('should return an empty string when the stylesheet is empty', () => {
    expect(minifyStylesheet('', 'oen.min.css').css).toBe('');
  });

  it('should return an empty string and an issue when clean-css throws', () => {
    const minified = minifyStylesheet(undefined as never, 'oen.min.css');

    expect(minified.css).toBe('');
    expect(minified.issue).toBeTypeOf('string');
  });
});

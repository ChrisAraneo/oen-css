import { describe, expect, it } from 'vitest';
import { toLicenseComment } from './to-license-comment.ts';

describe('toLicenseComment', () => {
  it('should return the name and both details when the comment is pipe separated', () => {
    const text =
      '/*! minireset.css v0.0.6 | MIT License | github.com/jgthms */';

    expect(toLicenseComment(text)).toEqual({
      text,
      name: 'minireset.css v0.0.6',
      details: ['MIT License', 'github.com/jgthms'],
    });
  });

  it('should return the original text with its markers when called with a comment', () => {
    const text = '/*! a | b */';

    expect(toLicenseComment(text).text).toBe(text);
  });

  it('should return the whole comment as the name when it has no separator', () => {
    expect(toLicenseComment('/*! Copyright (c) 2023 Jeremy Thomas */')).toEqual(
      {
        text: '/*! Copyright (c) 2023 Jeremy Thomas */',
        name: 'Copyright (c) 2023 Jeremy Thomas',
        details: [],
      },
    );
  });

  it('should return only the non-empty detail when the separators repeat', () => {
    expect(toLicenseComment('/*! a | | b */').details).toEqual(['b']);
  });

  it('should return the whole text as the name when the comment holds only whitespace', () => {
    expect(toLicenseComment('/*!   */')).toEqual({
      text: '/*!   */',
      name: '/*!   */',
      details: [],
    });
  });

  it('should return the name and the detail when the text has no comment markers', () => {
    expect(toLicenseComment('plain | tail')).toEqual({
      text: 'plain | tail',
      name: 'plain',
      details: ['tail'],
    });
  });
});

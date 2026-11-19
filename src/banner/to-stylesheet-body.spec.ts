import { describe, expect, it } from 'vitest';
import { toStylesheetBody } from './to-stylesheet-body.ts';

describe('toStylesheetBody', () => {
  it('should return the body without the charset when the stylesheet starts with one', () => {
    expect(toStylesheetBody('@charset "UTF-8";\nbody {}')).toBe('body {}');
  });

  it('should return the body without the banner when the stylesheet starts with one', () => {
    expect(toStylesheetBody('/*! oen */\nbody {}')).toBe('body {}');
  });

  it('should return the body alone when the stylesheet starts with a charset and a banner', () => {
    expect(
      toStylesheetBody('@charset "UTF-8";\n/*!\n * oen\n */\nbody {}'),
    ).toBe('body {}');
  });

  it('should return the stylesheet unchanged when it has no header', () => {
    expect(toStylesheetBody('body {}')).toBe('body {}');
  });

  it('should return the license comment unchanged when it is not at the start', () => {
    expect(toStylesheetBody('body {}\n/*! embedded */')).toBe(
      'body {}\n/*! embedded */',
    );
  });

  it('should return the second banner in the body when the stylesheet starts with two', () => {
    expect(toStylesheetBody('/*! first */\n/*! second */\nbody {}')).toBe(
      '/*! second */\nbody {}',
    );
  });

  it('should return the body without the charset when the charset is upper case', () => {
    expect(toStylesheetBody('@CHARSET "utf-8";\nbody {}')).toBe('body {}');
  });

  it('should return an empty string when the stylesheet is empty', () => {
    expect(toStylesheetBody('')).toBe('');
  });
});

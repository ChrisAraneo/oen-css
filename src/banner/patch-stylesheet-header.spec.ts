import { describe, expect, it } from 'vitest';
import { patchStylesheetHeader } from './patch-stylesheet-header.ts';

describe('patchStylesheetHeader', () => {
  it('should return the charset, then the banner, then the css when the stylesheet has no charset', () => {
    expect(patchStylesheetHeader('body {}', '/*! oen */')).toBe(
      '@charset "UTF-8";\n/*! oen */\nbody {}',
    );
  });

  it('should return one charset when the stylesheet already had one', () => {
    expect(
      patchStylesheetHeader('@charset "UTF-8";\nbody {}', '/*! oen */'),
    ).toBe('@charset "UTF-8";\n/*! oen */\nbody {}');
  });

  it('should return the UTF-8 charset when the stylesheet declared another one', () => {
    expect(
      patchStylesheetHeader('@charset "iso-8859-1";\nbody {}', '/*! oen */'),
    ).toBe('@charset "UTF-8";\n/*! oen */\nbody {}');
  });

  it('should return the body charset unchanged when it is not at the start', () => {
    expect(
      patchStylesheetHeader('body {}\n@charset "UTF-8";', '/*! oen */'),
    ).toBe('@charset "UTF-8";\n/*! oen */\nbody {}\n@charset "UTF-8";');
  });

  it('should return the multi-line banner unchanged when called with one', () => {
    expect(patchStylesheetHeader('body {}', '/*!\n * oen\n */')).toBe(
      '@charset "UTF-8";\n/*!\n * oen\n */\nbody {}',
    );
  });

  it('should return the charset and the banner when the stylesheet is empty', () => {
    expect(patchStylesheetHeader('', '/*! oen */')).toBe(
      '@charset "UTF-8";\n/*! oen */\n',
    );
  });
});

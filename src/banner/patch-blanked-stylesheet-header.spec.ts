import { describe, expect, it } from 'vitest';
import { patchBlankedStylesheetHeader } from './patch-blanked-stylesheet-header.ts';

describe('patchBlankedStylesheetHeader', () => {
  it('should return a blank line in place of the banner when the banner is one line', () => {
    expect(patchBlankedStylesheetHeader('/*! oen */\nbody {}')).toBe(
      '\nbody {}',
    );
  });

  it('should return three blank lines when the banner is three lines', () => {
    expect(patchBlankedStylesheetHeader('/*!\n * oen\n */\nbody {}')).toBe(
      '\n\n\nbody {}',
    );
  });

  it('should return the same line count when the header is a charset and a banner', () => {
    const css = '@charset "UTF-8";\n/*!\n * oen\n */\nbody {}';

    expect(patchBlankedStylesheetHeader(css).split('\n')).toHaveLength(
      css.split('\n').length,
    );
  });

  it('should return the stylesheet unchanged when it has no banner', () => {
    expect(patchBlankedStylesheetHeader('body {}')).toBe('body {}');
  });

  it('should return the stylesheet unchanged when no banner follows the charset', () => {
    expect(patchBlankedStylesheetHeader('@charset "UTF-8";\nbody {}')).toBe(
      '@charset "UTF-8";\nbody {}',
    );
  });

  it('should return the declarations that follow the header when the banner is blanked', () => {
    expect(patchBlankedStylesheetHeader('/*! oen */\nbody {}')).toContain(
      'body {}',
    );
  });

  it('should return the embedded comment unchanged when the leading banner is blanked', () => {
    expect(
      patchBlankedStylesheetHeader('/*! oen */\n/*! embedded */\nbody {}'),
    ).toBe('\n/*! embedded */\nbody {}');
  });
});

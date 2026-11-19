import { describe, expect, it } from 'vitest';
import { formatStylesheetSize } from './format-stylesheet-size.ts';

describe('formatStylesheetSize', () => {
  it('should return the raw size and the gzipped size when called with a stylesheet', () => {
    expect(formatStylesheetSize('body {}')).toMatch(
      /^\d+\.\d kB \(\d+\.\d kB gzipped\)$/,
    );
  });

  it('should return a different size when the stylesheet is larger', () => {
    const small = formatStylesheetSize('a{}');
    const large = formatStylesheetSize('a{}'.repeat(1000));

    expect(large).not.toBe(small);
  });

  it('should return `0.0 kB` when the stylesheet is empty', () => {
    expect(formatStylesheetSize('')).toMatch(/^0\.0 kB/);
  });

  it('should return the size in bytes when the stylesheet contains multi-byte text', () => {
    expect(formatStylesheetSize('/* Pająk */')).toMatch(/^0\.0 kB/);
  });

  it('should return the gzipped size when the css is repetitive', () => {
    expect(formatStylesheetSize('.a{color:red}'.repeat(500))).toContain(
      'gzipped',
    );
  });
});

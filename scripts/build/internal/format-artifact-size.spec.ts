import { describe, expect, it } from 'vitest';
import { formatArtifactSize } from './format-artifact-size.ts';

describe('formatArtifactSize', () => {
  it('should return the raw size and the gzipped size when called with a stylesheet', () => {
    expect(formatArtifactSize('body {}')).toMatch(
      /^\d+\.\d kB \(\d+\.\d kB gzipped\)$/,
    );
  });

  it('should return a different size when the stylesheet is larger', () => {
    const small = formatArtifactSize('a{}');
    const large = formatArtifactSize('a{}'.repeat(1000));

    expect(large).not.toBe(small);
  });

  it('should return `0.0 kB` when the stylesheet is empty', () => {
    expect(formatArtifactSize('')).toMatch(/^0\.0 kB/);
  });

  it('should return the size in bytes when the stylesheet contains multi-byte text', () => {
    expect(formatArtifactSize('/* Pająk */')).toMatch(/^0\.0 kB/);
  });

  it('should return the gzipped size when the css is repetitive', () => {
    expect(formatArtifactSize('.a{color:red}'.repeat(500))).toContain(
      'gzipped',
    );
  });
});

import { describe, expect, it } from 'vitest';
import { formatEmbeddedLicenseComments } from './format-embedded-license-comments.ts';

const COMMENT = {
  name: 'minireset.css v0.0.6',
  details: ['MIT License'],
  text: '/*! minireset.css v0.0.6 | MIT License */',
};

describe('formatEmbeddedLicenseComments', () => {
  it('should return an empty string when there is no embedded notice', () => {
    expect(formatEmbeddedLicenseComments([])).toBe('');
  });

  it('should return the section heading when there is one notice', () => {
    expect(formatEmbeddedLicenseComments([COMMENT])).toContain(
      '## Notices embedded in the stylesheets',
    );
  });

  it('should return a section saying the notices are read out of the built stylesheet when there is one', () => {
    expect(formatEmbeddedLicenseComments([COMMENT])).toContain(
      'reading the\nlicense comments back out of the built',
    );
  });

  it('should return a subsection per notice when there are two', () => {
    const section = formatEmbeddedLicenseComments([
      COMMENT,
      { name: 'other', details: [], text: '/*! other */' },
    ]);

    expect(section).toContain('### minireset.css v0.0.6');
    expect(section).toContain('### other');
  });

  it('should return a section that starts with a newline when there is one notice', () => {
    expect(formatEmbeddedLicenseComments([COMMENT]).startsWith('\n')).toBe(
      true,
    );
  });
});

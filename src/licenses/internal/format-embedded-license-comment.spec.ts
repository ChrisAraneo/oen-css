import { describe, expect, it } from 'vitest';
import { formatEmbeddedLicenseComment } from './format-embedded-license-comment.ts';

const COMMENT = {
  name: 'minireset.css v0.0.6',
  details: ['MIT License', 'github.com/jgthms/minireset.css'],
  text: '/*! minireset.css v0.0.6 | MIT License | github.com/jgthms */',
};

describe('formatEmbeddedLicenseComment', () => {
  it('should return the component name as a heading when called with a comment', () => {
    expect(formatEmbeddedLicenseComment(COMMENT)).toContain(
      '### minireset.css v0.0.6',
    );
  });

  it('should return every detail as a bullet when the comment carries two', () => {
    const section = formatEmbeddedLicenseComment(COMMENT);

    expect(section).toContain('- MIT License');
    expect(section).toContain('- github.com/jgthms/minireset.css');
  });

  it('should return the notice verbatim in a css fence when called with a comment', () => {
    expect(formatEmbeddedLicenseComment(COMMENT)).toContain(
      `\`\`\`css\n${COMMENT.text}\n\`\`\``,
    );
  });

  it('should return a section saying the notice is preserved in both stylesheets when called with a comment', () => {
    expect(formatEmbeddedLicenseComment(COMMENT)).toContain(
      'preserved verbatim in both',
    );
  });

  it('should return the heading and no bullet when the comment carries no detail', () => {
    const section = formatEmbeddedLicenseComment({
      name: 'bare',
      details: [],
      text: '/*! bare */',
    });

    expect(section).toContain('### bare');
    expect(section).not.toContain('- ');
  });
});

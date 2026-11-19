import { describe, expect, it } from 'vitest';
import { formatMissingEmbeddedNotice } from './format-missing-embedded-notice.ts';

const COMMENT = {
  name: 'minireset.css v0.0.6',
  details: ['MIT License'],
  text: '/*! minireset.css v0.0.6 | MIT License */',
};

describe('formatMissingEmbeddedNotice', () => {
  it('should return `undefined` when the notice survives and is documented', () => {
    expect(
      formatMissingEmbeddedNotice(
        COMMENT,
        `body{}${COMMENT.text}`,
        `# Notices\n${COMMENT.text}`,
      ),
    ).toBe(undefined);
  });

  it('should return the minification issue when the notice is not in the minified stylesheet', () => {
    expect(
      formatMissingEmbeddedNotice(COMMENT, 'body{}', `# ${COMMENT.text}`),
    ).toBe(
      '"minireset.css v0.0.6" is in oen.css but was minified out of oen.min.css',
    );
  });

  it('should return the documentation issue when the notice is not in the notices', () => {
    expect(
      formatMissingEmbeddedNotice(COMMENT, COMMENT.text, '# Notices'),
    ).toBe(
      '"minireset.css v0.0.6" is not documented in THIRD-PARTY-NOTICES.md',
    );
  });

  it('should return the minification issue first when both are missing', () => {
    expect(formatMissingEmbeddedNotice(COMMENT, '', '')).toContain(
      'minified out of',
    );
  });

  it('should return an issue naming the component when the notice is missing', () => {
    expect(formatMissingEmbeddedNotice(COMMENT, '', '')).toContain(
      'minireset.css v0.0.6',
    );
  });
});

import { describe, expect, it } from 'vitest';
import { formatEmbeddedNoticesIssue } from './format-embedded-notices-issue.ts';

const COMMENT = {
  name: 'minireset.css v0.0.6',
  details: ['MIT License'],
  text: '/*! minireset.css v0.0.6 */',
};

describe('formatEmbeddedNoticesIssue', () => {
  it('should return `undefined` when every notice survives and is documented', () => {
    expect(
      formatEmbeddedNoticesIssue([COMMENT], COMMENT.text, COMMENT.text),
    ).toBe(undefined);
  });

  it('should return an issue naming the minireset.css notice when no notice was found', () => {
    expect(formatEmbeddedNoticesIssue([], '', '')).toContain(
      'expected at least the vendored minireset.css notice',
    );
  });

  it('should return an issue saying the notice can be removed deliberately when none was found', () => {
    expect(formatEmbeddedNoticesIssue([], '', '')).toContain('deliberately');
  });

  it('should return the minification issue when the notice is not in the minified stylesheet', () => {
    expect(formatEmbeddedNoticesIssue([COMMENT], '', COMMENT.text)).toContain(
      'minified out of',
    );
  });

  it('should return the documentation issue when the notice is not in the notices', () => {
    expect(formatEmbeddedNoticesIssue([COMMENT], COMMENT.text, '')).toContain(
      'not documented in',
    );
  });

  it('should return the issue of the first notice when two notices are missing', () => {
    expect(
      formatEmbeddedNoticesIssue(
        [COMMENT, { name: 'other', details: [], text: '/*! other */' }],
        '',
        '',
      ),
    ).toContain('minireset.css v0.0.6');
  });

  it('should return `undefined` when both notices survive and are documented', () => {
    expect(
      formatEmbeddedNoticesIssue(
        [COMMENT, { name: 'other', details: [], text: '/*! other */' }],
        `${COMMENT.text}/*! other */`,
        `${COMMENT.text}/*! other */`,
      ),
    ).toBe(undefined);
  });
});

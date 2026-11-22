import { describe, expect, it } from 'vitest';
import { formatPaperShadersNotices } from './format-paper-shaders-notices.ts';

const FACTS = {
  version: '0.0.82',
  license: '\nApache License\nVersion 2.0, January 2004\n',
  notice: '\nPaper Shaders\n\nCopyright 2026 Paper\n',
};

describe('formatPaperShadersNotices', () => {
  it('should return the version as a heading when called with the facts', () => {
    expect(formatPaperShadersNotices(FACTS)).toContain(
      '## Paper Shaders 0.0.82',
    );
  });

  it('should return the license name when called with the facts', () => {
    expect(formatPaperShadersNotices(FACTS)).toContain(
      '- License: Apache License 2.0',
    );
  });

  it('should return the notice trimmed when called with the facts', () => {
    expect(formatPaperShadersNotices(FACTS)).toContain(
      '```text\nPaper Shaders\n\nCopyright 2026 Paper\n```',
    );
  });

  it('should return the license text trimmed when called with the facts', () => {
    expect(formatPaperShadersNotices(FACTS)).toContain(
      '```text\nApache License\nVersion 2.0, January 2004\n```',
    );
  });

  it('should return which artifacts bundle the shader when called with the facts', () => {
    expect(formatPaperShadersNotices(FACTS)).toContain(
      '`oen.js` and `oen.min.js`',
    );
  });
});

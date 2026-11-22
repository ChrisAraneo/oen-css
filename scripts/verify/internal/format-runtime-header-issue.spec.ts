import { describe, expect, it } from 'vitest';
import { formatRuntimeHeaderIssue } from './format-runtime-header-issue.ts';

const BANNER = `/*!
 * oen-css v0.2.1 | MIT License | https://example.com
 *
 * Bundles Paper Shaders v0.0.82 | Apache License 2.0 | https://shaders.paper.design
 * Copyright 2026 Paper
 * reproduced in full in THIRD_PARTY_NOTICES.md
 */`;

const file = (text: string) => ({ path: 'oen.js', text, issue: undefined });

describe('formatRuntimeHeaderIssue', () => {
  it('should return `undefined` when the code starts with the full banner', () => {
    expect(formatRuntimeHeaderIssue(file(`${BANNER}\n(()=>{})();`))).toBe(
      undefined,
    );
  });

  it('should return the issue when the code does not start with a license comment', () => {
    expect(formatRuntimeHeaderIssue(file('(()=>{})();'))).toBe(
      'oen.js does not start with /*!',
    );
  });

  it('should return the missing fragments when the banner omits the shader attribution', () => {
    expect(
      formatRuntimeHeaderIssue(
        file(
          '/*!\n * oen-css v0.2.1 | MIT License\n * Copyright 2026\n */\n(()=>{})();',
        ),
      ),
    ).toBe(
      'oen.js banner is missing "Paper Shaders", "Apache License 2.0", "THIRD_PARTY_NOTICES.md"',
    );
  });

  it('should return the issue when the code is an empty string', () => {
    expect(formatRuntimeHeaderIssue(file(''))).toBe(
      'oen.js does not start with /*!',
    );
  });
});

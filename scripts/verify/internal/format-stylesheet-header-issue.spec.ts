import { describe, expect, it } from 'vitest';
import { formatStylesheetHeaderIssue } from './format-stylesheet-header-issue.ts';

const BANNER = `/*!
 * oen-css v0.2.1 | MIT License | https://example.com
 * Built from Bulma v1.0.4 | MIT License | https://bulma.io
 * Copyright (c) 2023 Jeremy Thomas
 * reproduced verbatim in LICENSE-bulma
 */`;

const file = (text: string, path = 'dist/oen.css') => ({
  path,
  text,
  issue: undefined,
});

describe('formatStylesheetHeaderIssue', () => {
  it('should return `undefined` when the header carries the charset and every fragment', () => {
    expect(
      formatStylesheetHeaderIssue(file(`@charset "UTF-8";\n${BANNER}\nbody{}`)),
    ).toBe(undefined);
  });

  it('should return the charset issue when the stylesheet starts with the banner', () => {
    expect(formatStylesheetHeaderIssue(file(`${BANNER}\nbody{}`))).toBe(
      'oen.css does not start with @charset "UTF-8";',
    );
  });

  it('should return the charset issue first when the header is missing entirely', () => {
    expect(formatStylesheetHeaderIssue(file('body{}'))).toContain(
      'does not start with',
    );
  });

  it('should return the fragment issue when the banner leaves out the Bulma version', () => {
    expect(
      formatStylesheetHeaderIssue(
        file(
          `@charset "UTF-8";\n${BANNER.replace('Bulma v1.0.4', '')}\nbody{}`,
        ),
      ),
    ).toBe('oen.css banner is missing "Bulma v"');
  });

  it('should return an issue naming `oen.min.css` when that file is checked', () => {
    expect(
      formatStylesheetHeaderIssue(file('body{}', 'C:/repo/dist/oen.min.css')),
    ).toContain('oen.min.css');
  });
});

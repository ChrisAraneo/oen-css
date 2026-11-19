import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateStylesheetHeaders } from './validate-stylesheet-headers.ts';

const BANNER = `/*!
 * oen-css v0.2.1 | MIT License | https://example.com
 * Built from Bulma v1.0.4 | MIT License | https://bulma.io
 * Copyright (c) 2023 Jeremy Thomas
 * reproduced verbatim in LICENSE-bulma
 */`;

const HEADER = `@charset "UTF-8";\n${BANNER}\n`;

const file = (path: string, text: string) => ({ path, text, issue: undefined });

const inputs = (overrides: Partial<VerifyInputs> = {}): VerifyInputs => ({
  stylesheet: file('dist/oen.css', `${HEADER}body {}`),
  minifiedStylesheet: file('dist/oen.min.css', `${HEADER}body{}`),
  oenLicense: file('dist/LICENSE', ''),
  bulmaLicense: file('dist/LICENSE-bulma', ''),
  thirdPartyNotices: file('dist/THIRD-PARTY-NOTICES.md', ''),
  repositoryOenLicense: file('LICENSE', ''),
  repositoryBulmaLicense: file('node_modules/bulma/LICENSE', ''),
  bulmaManifest: file('node_modules/bulma/package.json', '{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
  ...overrides,
});

describe('validateStylesheetHeaders', () => {
  it('should return the check name and both stylesheets when both headers are complete', () => {
    const result = validateStylesheetHeaders(inputs());

    expect(result.name).toBe(
      'stylesheets start with @charset and the attribution banner',
    );
    expect(result.detail).toBe('oen.css, oen.min.css');
  });

  it('should return `undefined` as the issue when both headers are complete', () => {
    expect(validateStylesheetHeaders(inputs()).issue).toBe(undefined);
  });

  it('should return the charset issue when the expanded stylesheet has no charset', () => {
    expect(
      validateStylesheetHeaders(
        inputs({ stylesheet: file('dist/oen.css', `${BANNER}\nbody {}`) }),
      ).issue,
    ).toContain('oen.css does not start with');
  });

  it('should return the fragment issue when the minified banner lost the Bulma version', () => {
    expect(
      validateStylesheetHeaders(
        inputs({
          minifiedStylesheet: file(
            'dist/oen.min.css',
            `@charset "UTF-8";\n${BANNER.replace('Bulma v1.0.4', '')}\nbody{}`,
          ),
        }),
      ).issue,
    ).toBe('oen.min.css banner is missing "Bulma v"');
  });

  it('should return the `oen.css` issue when both stylesheets have no header', () => {
    expect(
      validateStylesheetHeaders(
        inputs({
          stylesheet: file('dist/oen.css', 'body {}'),
          minifiedStylesheet: file('dist/oen.min.css', 'body{}'),
        }),
      ).issue,
    ).toContain('oen.css');
  });
});

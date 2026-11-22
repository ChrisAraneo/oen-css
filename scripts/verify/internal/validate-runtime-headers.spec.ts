import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateRuntimeHeaders } from './validate-runtime-headers.ts';

const BANNER = `/*!
 * oen-css v0.2.1 | MIT License | https://example.com
 *
 * Bundles Paper Shaders v0.0.82 | Apache License 2.0 | https://shaders.paper.design
 * Copyright 2026 Paper
 * reproduced in full in THIRD_PARTY_NOTICES.md
 */`;

const file = (path: string, text: string) => ({ path, text, issue: undefined });

const inputs = (overrides: Partial<VerifyInputs> = {}): VerifyInputs => ({
  stylesheet: file('oen.css', ''),
  minifiedStylesheet: file('oen.min.css', ''),
  runtime: file('oen.js', `${BANNER}\n(() => {})();`),
  minifiedRuntime: file('oen.min.js', `${BANNER}\n(()=>{})();`),
  oenLicense: file('LICENSE', ''),
  bulmaLicense: file('LICENSE-bulma', ''),
  thirdPartyNotices: file('THIRD_PARTY_NOTICES.md', ''),
  repositoryBulmaLicense: file('node_modules/bulma/LICENSE', ''),
  bulmaManifest: file('node_modules/bulma/package.json', '{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
  ...overrides,
});

describe('validateRuntimeHeaders', () => {
  it('should return the check name and both runtimes when both banners are complete', () => {
    const result = validateRuntimeHeaders(inputs());

    expect(result.name).toBe('runtimes start with the attribution banner');
    expect(result.detail).toBe('oen.js, oen.min.js');
  });

  it('should return no issue when both runtimes carry the banner', () => {
    expect(validateRuntimeHeaders(inputs()).issue).toBe(undefined);
  });

  it('should return the issue naming the expanded runtime when it has no banner', () => {
    expect(
      validateRuntimeHeaders(
        inputs({ runtime: file('oen.js', '(() => {})();') }),
      ).issue,
    ).toBe('oen.js does not start with /*!');
  });

  it('should return the issue naming the minified runtime when it has no banner', () => {
    expect(
      validateRuntimeHeaders(
        inputs({ minifiedRuntime: file('oen.min.js', '(()=>{})();') }),
      ).issue,
    ).toBe('oen.min.js does not start with /*!');
  });

  it('should return the first issue when neither runtime carries the banner', () => {
    expect(
      validateRuntimeHeaders(
        inputs({
          runtime: file('oen.js', ''),
          minifiedRuntime: file('oen.min.js', ''),
        }),
      ).issue,
    ).toBe('oen.js does not start with /*!');
  });
});

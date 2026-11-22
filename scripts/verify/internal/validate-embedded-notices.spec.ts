import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateEmbeddedNotices } from './validate-embedded-notices.ts';

const NOTICE = '/*! minireset.css v0.0.6 | MIT License */';

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const inputs = (overrides: Partial<VerifyInputs> = {}): VerifyInputs => ({
  stylesheet: file(`body{}\n${NOTICE}`),
  minifiedStylesheet: file(`body{}${NOTICE}`),
  runtime: file(''),
  minifiedRuntime: file(''),
  oenLicense: file(''),
  bulmaLicense: file(''),
  thirdPartyNotices: file(`# Notices\n${NOTICE}`),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
  ...overrides,
});

describe('validateEmbeddedNotices', () => {
  it('should return the check name and the notice it found when the notice survives', () => {
    const result = validateEmbeddedNotices(inputs());

    expect(result.name).toBe('notices embedded by Bulma survive minification');
    expect(result.detail).toBe('minireset.css v0.0.6');
  });

  it('should return `undefined` as the issue when the notice survives and is documented', () => {
    expect(validateEmbeddedNotices(inputs()).issue).toBe(undefined);
  });

  it('should return the minification issue when the minified stylesheet lost the notice', () => {
    expect(
      validateEmbeddedNotices(inputs({ minifiedStylesheet: file('body{}') }))
        .issue,
    ).toContain('minified out of oen.min.css');
  });

  it('should return the documentation issue when the notices do not carry it', () => {
    expect(
      validateEmbeddedNotices(inputs({ thirdPartyNotices: file('# Notices') }))
        .issue,
    ).toContain('not documented in THIRD_PARTY_NOTICES.md');
  });

  it('should return the missing notice issue when the stylesheet embeds none', () => {
    expect(
      validateEmbeddedNotices(inputs({ stylesheet: file('body{}') })).issue,
    ).toContain('expected at least the vendored minireset.css notice');
  });

  it('should return both notices in the detail when the stylesheet embeds two', () => {
    expect(
      validateEmbeddedNotices(
        inputs({ stylesheet: file(`body{}\n${NOTICE}\n/*! other | x */`) }),
      ).detail,
    ).toBe('minireset.css v0.0.6, other');
  });
});

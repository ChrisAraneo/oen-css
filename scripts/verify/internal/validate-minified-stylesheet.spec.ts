import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateMinifiedStylesheet } from './validate-minified-stylesheet.ts';

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const inputs = (expanded: string, minified: string): VerifyInputs => ({
  stylesheet: file(expanded),
  minifiedStylesheet: file(minified),
  oenLicense: file(''),
  bulmaLicense: file(''),
  thirdPartyNotices: file(''),
  repositoryOenLicense: file(''),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
});

describe('validateMinifiedStylesheet', () => {
  it('should return the check name and the reduction when the minified stylesheet is smaller', () => {
    const result = validateMinifiedStylesheet(
      inputs('body { color: red; }', 'body{color:red}'),
    );

    expect(result.name).toBe('minified output is smaller and still intact');
    expect(result.detail).toMatch(/^\d+\.\d% smaller, balanced braces$/);
  });

  it('should return `undefined` as the issue when the minified stylesheet is smaller and balanced', () => {
    expect(
      validateMinifiedStylesheet(
        inputs('body { color: red; }', 'body{color:red}'),
      ).issue,
    ).toBe(undefined);
  });

  it('should return the size issue when the minified stylesheet is not smaller', () => {
    expect(validateMinifiedStylesheet(inputs('a{}', 'a{}')).issue).toContain(
      'is not smaller than',
    );
  });

  it('should return the braces issue when the minified stylesheet is truncated', () => {
    expect(
      validateMinifiedStylesheet(inputs('body { color: red; }', 'body{')).issue,
    ).toBe('oen.min.css has unbalanced braces');
  });

  it('should return `50.0% smaller` as the detail when the size halves', () => {
    expect(
      validateMinifiedStylesheet(inputs('a'.repeat(200), 'a'.repeat(100)))
        .detail,
    ).toBe('50.0% smaller, balanced braces');
  });
});

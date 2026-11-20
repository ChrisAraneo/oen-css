import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateNoLeftoverBulma } from './validate-no-leftover-bulma.ts';

const file = (path: string, text: string) => ({ path, text, issue: undefined });

const inputs = (overrides: Partial<VerifyInputs> = {}): VerifyInputs => ({
  stylesheet: file('oen.css', '--oen-primary: red;'),
  minifiedStylesheet: file('oen.min.css', '--oen-primary:red'),
  oenLicense: file('LICENSE', ''),
  bulmaLicense: file('LICENSE-bulma', ''),
  thirdPartyNotices: file('THIRD_PARTY_NOTICES.md', ''),
  repositoryBulmaLicense: file('node_modules/bulma/LICENSE', ''),
  bulmaManifest: file('node_modules/bulma/package.json', '{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
  ...overrides,
});

describe('validateNoLeftoverBulma', () => {
  it('should return the check name and both stylesheets when neither leaked', () => {
    const result = validateNoLeftoverBulma(inputs());

    expect(result.name).toBe('no bulma identifiers leak outside the banner');
    expect(result.detail).toBe('oen.css, oen.min.css');
  });

  it('should return `undefined` as the issue when both stylesheets were fully renamed', () => {
    expect(validateNoLeftoverBulma(inputs()).issue).toBe(undefined);
  });

  it('should return the `oen.css` issue when the expanded stylesheet kept a bulma property', () => {
    expect(
      validateNoLeftoverBulma(
        inputs({ stylesheet: file('oen.css', '--bulma-primary: red;') }),
      ).issue,
    ).toBe('oen.css still contains --bulma- custom properties');
  });

  it('should return the `oen.min.css` issue when the minified stylesheet kept a bulma property', () => {
    expect(
      validateNoLeftoverBulma(
        inputs({
          minifiedStylesheet: file('oen.min.css', '--bulma-primary:red'),
        }),
      ).issue,
    ).toBe('oen.min.css still contains --bulma- custom properties');
  });

  it('should return the `oen.css` issue when both stylesheets leaked', () => {
    expect(
      validateNoLeftoverBulma(
        inputs({
          stylesheet: file('oen.css', '--bulma-a: 1;'),
          minifiedStylesheet: file('oen.min.css', '--bulma-a:1'),
        }),
      ).issue,
    ).toContain('oen.css');
  });

  it('should return `undefined` as the issue when the only bulma references are in the banner', () => {
    expect(
      validateNoLeftoverBulma(
        inputs({
          stylesheet: file(
            'oen.css',
            '/*! Built from Bulma v1.0.4 | https://bulma.io */\nbody{}',
          ),
        }),
      ).issue,
    ).toBe(undefined);
  });
});

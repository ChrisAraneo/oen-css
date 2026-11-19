import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateBulmaEquivalence } from './validate-bulma-equivalence.ts';

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const inputs = (ours: string, theirs: string): VerifyInputs => ({
  stylesheet: file(ours),
  minifiedStylesheet: file(''),
  oenLicense: file(''),
  bulmaLicense: file(''),
  thirdPartyNotices: file(''),
  repositoryOenLicense: file(''),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{"version":"1.0.4"}'),
  upstreamBulmaStylesheet: { css: theirs, issue: undefined },
});

describe('validateBulmaEquivalence', () => {
  it('should return the check name and the Bulma version when the stylesheets match', () => {
    const result = validateBulmaEquivalence(inputs('body{}', 'body{}'));

    expect(result.name).toBe(
      'output is Bulma, re-namespaced and re-themed, nothing else',
    );
    expect(result.detail).toContain('Bulma v1.0.4');
  });

  it('should return `undefined` as the issue when our output renames back to Bulma', () => {
    expect(
      validateBulmaEquivalence(
        inputs('--oen-radius: 4px;', '--bulma-radius: 4px;'),
      ).issue,
    ).toBe(undefined);
  });

  it('should return `undefined` as the issue when the only difference is the banner', () => {
    expect(
      validateBulmaEquivalence(
        inputs('@charset "UTF-8";\n/*! oen */\nbody{}', 'body{}'),
      ).issue,
    ).toBe(undefined);
  });

  it('should return `undefined` as the issue when the theme explains the difference', () => {
    expect(
      validateBulmaEquivalence(
        inputs('--oen-primary: red;', '--bulma-primary: blue;'),
      ).issue,
    ).toBe(undefined);
  });

  it('should return the theme declaration count in the detail when the theme explains one difference', () => {
    expect(
      validateBulmaEquivalence(
        inputs('--oen-primary: red;', '--bulma-primary: blue;'),
      ).detail,
    ).toContain('apart from 1 theme declarations');
  });

  it('should return the equivalence issue when the theme does not explain the difference', () => {
    expect(
      validateBulmaEquivalence(inputs('.buton{}', '.button{}')).issue,
    ).toContain('differs from Bulma outside the Oen theme');
  });

  it('should return the compared byte count in the detail when the stylesheets match', () => {
    expect(
      validateBulmaEquivalence(inputs('body{}', 'body{}')).detail,
    ).toContain('bytes compared');
  });
});

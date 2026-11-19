import { range } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateCustomProperties } from './validate-custom-properties.ts';

const COMPLETE_STYLESHEET = [
  '--oen-primary: red;',
  '--oen-scheme-main: white;',
  '--oen-radius: 4px;',
  '--oen-family-primary: sans-serif;',
  ...range(500).map((index) => `--oen-generated-${index}: 0;`),
].join('\n');

const file = (text: string) => ({
  path: 'dist/oen.css',
  text,
  issue: undefined,
});

const inputs = (stylesheet: string): VerifyInputs => ({
  stylesheet: file(stylesheet),
  minifiedStylesheet: file(''),
  oenLicense: file(''),
  bulmaLicense: file(''),
  thirdPartyNotices: file(''),
  repositoryOenLicense: file(''),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
});

describe('validateCustomProperties', () => {
  it('should return the check name when called with the inputs', () => {
    expect(validateCustomProperties(inputs(COMPLETE_STYLESHEET)).name).toBe(
      'custom properties are namespaced with --oen-',
    );
  });

  it('should return `504 distinct properties` as the detail when the stylesheet declares 504', () => {
    expect(validateCustomProperties(inputs(COMPLETE_STYLESHEET)).detail).toBe(
      '504 distinct properties',
    );
  });

  it('should return `undefined` as the issue when the stylesheet is complete', () => {
    expect(validateCustomProperties(inputs(COMPLETE_STYLESHEET)).issue).toBe(
      undefined,
    );
  });

  it('should return the count issue when the stylesheet declares one property', () => {
    expect(
      validateCustomProperties(inputs('--oen-primary: red;')).issue,
    ).toContain('expected at least 500');
  });

  it('should return `--oen-radius` when the stylesheet does not declare it', () => {
    expect(
      validateCustomProperties(
        inputs(COMPLETE_STYLESHEET.replace('--oen-radius: 4px;', '')),
      ).issue,
    ).toContain('--oen-radius');
  });

  it('should return `0 distinct properties` as the detail when the property is only read', () => {
    expect(
      validateCustomProperties(inputs('.a{color:var(--oen-primary)}')).detail,
    ).toBe('0 distinct properties');
  });
});

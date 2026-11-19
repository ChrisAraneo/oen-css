import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateOenLicense } from './validate-oen-license.ts';

const LICENSE = 'MIT License\n\nCopyright (c) 2026 Krzysztof Pająk\n';

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const inputs = (overrides: Partial<VerifyInputs> = {}): VerifyInputs => ({
  stylesheet: file(''),
  minifiedStylesheet: file(''),
  oenLicense: file(LICENSE),
  bulmaLicense: file(''),
  thirdPartyNotices: file(''),
  repositoryOenLicense: file(LICENSE),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
  ...overrides,
});

describe('validateOenLicense', () => {
  it('should return the check name when called with the inputs', () => {
    expect(validateOenLicense(inputs()).name).toBe(
      'own license ships alongside it',
    );
  });

  it('should return our copyright line as the detail when the license ships', () => {
    expect(validateOenLicense(inputs()).detail).toBe(
      'Copyright (c) 2026 Krzysztof Pająk',
    );
  });

  it('should return `undefined` as the issue when the shipped license matches the repository one', () => {
    expect(validateOenLicense(inputs()).issue).toBe(undefined);
  });

  it('should return the difference issue when the shipped license differs', () => {
    expect(
      validateOenLicense(inputs({ oenLicense: file('Apache License') })).issue,
    ).toBe('dist/LICENSE differs from the repository LICENSE');
  });

  it('should return the difference issue when the shipped license is empty', () => {
    expect(
      validateOenLicense(inputs({ oenLicense: file('') })).issue,
    ).toContain('differs');
  });

  it('should return an empty detail when the license has no copyright line', () => {
    expect(
      validateOenLicense(
        inputs({
          oenLicense: file('no notice'),
          repositoryOenLicense: file('no notice'),
        }),
      ).detail,
    ).toBe('');
  });
});

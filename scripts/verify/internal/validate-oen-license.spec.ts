import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateOenLicense } from './validate-oen-license.ts';

const LICENSE =
  'MIT License\n\nCopyright (c) 2026 Krzysztof Pająk\n\nPermission is hereby granted, free of charge\n';

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const inputs = (overrides: Partial<VerifyInputs> = {}): VerifyInputs => ({
  stylesheet: file(''),
  minifiedStylesheet: file(''),
  oenLicense: file(LICENSE),
  bulmaLicense: file(''),
  thirdPartyNotices: file(''),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
  ...overrides,
});

describe('validateOenLicense', () => {
  it('should return the check name when called with the inputs', () => {
    expect(validateOenLicense(inputs()).name).toBe(
      'own license ships with the package',
    );
  });

  it('should return our copyright line as the detail when the license ships', () => {
    expect(validateOenLicense(inputs()).detail).toBe(
      'Copyright (c) 2026 Krzysztof Pająk',
    );
  });

  it('should return `undefined` as the issue when the shipped license is the MIT notice', () => {
    expect(validateOenLicense(inputs()).issue).toBe(undefined);
  });

  it('should return the shape issue when the shipped license is another license', () => {
    expect(
      validateOenLicense(inputs({ oenLicense: file('Apache License') })).issue,
    ).toBe('LICENSE does not look like the MIT notice');
  });

  it('should return the shape issue when the shipped license is empty', () => {
    expect(
      validateOenLicense(inputs({ oenLicense: file('') })).issue,
    ).toContain('does not look like');
  });

  it('should return an empty detail when the license has no copyright line', () => {
    expect(
      validateOenLicense(inputs({ oenLicense: file('no notice') })).detail,
    ).toBe('');
  });
});

import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateBulmaLicense } from './validate-bulma-license.ts';

const LICENSE = `MIT License

Copyright (c) 2023 Jeremy Thomas

Permission is hereby granted, free of charge, to any person obtaining a copy`;

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const inputs = (overrides: Partial<VerifyInputs> = {}): VerifyInputs => ({
  stylesheet: file(''),
  minifiedStylesheet: file(''),
  oenLicense: file(''),
  bulmaLicense: file(LICENSE),
  thirdPartyNotices: file(`# Notices\n${LICENSE}\n`),
  repositoryOenLicense: file(''),
  repositoryBulmaLicense: file(LICENSE),
  bulmaManifest: file('{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
  ...overrides,
});

describe('validateBulmaLicense', () => {
  it('should return the check name when called with the inputs', () => {
    expect(validateBulmaLicense(inputs()).name).toBe(
      "Bulma's license ships verbatim",
    );
  });

  it('should return the copyright line and where it is reproduced as the detail when the license ships', () => {
    expect(validateBulmaLicense(inputs()).detail).toBe(
      'Copyright (c) 2023 Jeremy Thomas (reproduced in LICENSE-bulma and THIRD-PARTY-NOTICES.md)',
    );
  });

  it('should return `undefined` as the issue when the license ships verbatim and is documented', () => {
    expect(validateBulmaLicense(inputs()).issue).toBe(undefined);
  });

  it('should return the verbatim issue when the shipped license differs from the installed one', () => {
    expect(
      validateBulmaLicense(inputs({ bulmaLicense: file('MIT License') })).issue,
    ).toContain('differs from node_modules/bulma/LICENSE');
  });

  it('should return the notices issue when the notices do not reproduce the license', () => {
    expect(
      validateBulmaLicense(inputs({ thirdPartyNotices: file('# Notices') }))
        .issue,
    ).toContain('does not reproduce the Bulma notice');
  });

  it('should return a detail with no copyright line when the license has none', () => {
    expect(
      validateBulmaLicense(
        inputs({
          bulmaLicense: file('no notice'),
          repositoryBulmaLicense: file('no notice'),
        }),
      ).detail,
    ).toBe(' (reproduced in LICENSE-bulma and THIRD-PARTY-NOTICES.md)');
  });
});

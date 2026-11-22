import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validatePackageArtifacts } from './validate-package-artifacts.ts';

const file = (path: string, issue?: string) => ({
  path,
  text: issue === undefined ? 'content' : '',
  issue,
});

const inputs = (overrides: Partial<VerifyInputs> = {}): VerifyInputs => ({
  stylesheet: file('oen.css'),
  minifiedStylesheet: file('oen.min.css'),
  runtime: file('oen.js'),
  minifiedRuntime: file('oen.min.js'),
  oenLicense: file('LICENSE'),
  bulmaLicense: file('LICENSE-bulma'),
  thirdPartyNotices: file('THIRD_PARTY_NOTICES.md'),
  repositoryBulmaLicense: file('node_modules/bulma/LICENSE'),
  bulmaManifest: file('node_modules/bulma/package.json'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
  ...overrides,
});

describe('validatePackageArtifacts', () => {
  it('should return the check name and the seven artifacts as the detail when every artifact was read', () => {
    const result = validatePackageArtifacts(inputs());

    expect(result.name).toBe('package artifacts are present');
    expect(result.detail).toBe(
      'oen.css, oen.min.css, oen.js, oen.min.js, LICENSE, LICENSE-bulma, THIRD_PARTY_NOTICES.md',
    );
  });

  it('should return `undefined` as the issue when every artifact was read', () => {
    expect(validatePackageArtifacts(inputs()).issue).toBe(undefined);
  });

  it('should return the missing artifact and the build command when one could not be read', () => {
    expect(
      validatePackageArtifacts(
        inputs({ minifiedStylesheet: file('oen.min.css', 'ENOENT') }),
      ).issue,
    ).toBe('missing from the package root: oen.min.css. Run `npm run build`');
  });

  it('should return both artifacts when two could not be read', () => {
    expect(
      validatePackageArtifacts(
        inputs({
          stylesheet: file('oen.css', 'ENOENT'),
          oenLicense: file('LICENSE', 'ENOENT'),
        }),
      ).issue,
    ).toContain('oen.css, LICENSE');
  });

  it('should return `undefined` as the issue when only an upstream file could not be read', () => {
    expect(
      validatePackageArtifacts(
        inputs({
          repositoryBulmaLicense: file('node_modules/bulma/LICENSE', 'ENOENT'),
        }),
      ).issue,
    ).toBe(undefined);
  });
});

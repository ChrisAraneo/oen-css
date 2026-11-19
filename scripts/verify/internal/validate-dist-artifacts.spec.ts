import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateDistArtifacts } from './validate-dist-artifacts.ts';

const file = (path: string, issue?: string) => ({
  path,
  text: issue === undefined ? 'content' : '',
  issue,
});

const inputs = (overrides: Partial<VerifyInputs> = {}): VerifyInputs => ({
  stylesheet: file('dist/oen.css'),
  minifiedStylesheet: file('dist/oen.min.css'),
  oenLicense: file('dist/LICENSE'),
  bulmaLicense: file('dist/LICENSE-bulma'),
  thirdPartyNotices: file('dist/THIRD-PARTY-NOTICES.md'),
  repositoryOenLicense: file('LICENSE'),
  repositoryBulmaLicense: file('node_modules/bulma/LICENSE'),
  bulmaManifest: file('node_modules/bulma/package.json'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
  ...overrides,
});

describe('validateDistArtifacts', () => {
  it('should return the check name and the five artifacts as the detail when every artifact was read', () => {
    const result = validateDistArtifacts(inputs());

    expect(result.name).toBe('dist artifacts are present');
    expect(result.detail).toBe(
      'oen.css, oen.min.css, LICENSE, LICENSE-bulma, THIRD-PARTY-NOTICES.md',
    );
  });

  it('should return `undefined` as the issue when every artifact was read', () => {
    expect(validateDistArtifacts(inputs()).issue).toBe(undefined);
  });

  it('should return the missing artifact and the build command when one could not be read', () => {
    expect(
      validateDistArtifacts(
        inputs({ minifiedStylesheet: file('dist/oen.min.css', 'ENOENT') }),
      ).issue,
    ).toBe('missing from dist/: oen.min.css. Run `npm run build`');
  });

  it('should return both artifacts when two could not be read', () => {
    expect(
      validateDistArtifacts(
        inputs({
          stylesheet: file('dist/oen.css', 'ENOENT'),
          oenLicense: file('dist/LICENSE', 'ENOENT'),
        }),
      ).issue,
    ).toContain('oen.css, LICENSE');
  });

  it('should return `undefined` as the issue when only a repository file could not be read', () => {
    expect(
      validateDistArtifacts(
        inputs({ repositoryOenLicense: file('LICENSE', 'ENOENT') }),
      ).issue,
    ).toBe(undefined);
  });
});

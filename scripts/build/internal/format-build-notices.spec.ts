import { describe, expect, it } from 'vitest';
import type { BuildInputs } from '../types/build-inputs.ts';
import { formatBuildNotices } from './format-build-notices.ts';
import type { BuildNotices } from './types/build-notices.ts';

const inputs = (overrides: Partial<BuildInputs> = {}): BuildInputs => ({
  startedAt: 100,
  version: '0.2.1',
  homepage: 'https://example.com',
  bulmaVersion: '1.0.4',
  bulmaCopyright: 'Copyright (c) 2023 Jeremy Thomas',
  bulmaLicense: 'MIT License\n\nCopyright (c) 2023 Jeremy Thomas',
  stylesheet: '',
  issues: [],
  ...overrides,
});

const notices = (overrides: Partial<BuildNotices> = {}): BuildNotices => ({
  inputs: inputs(),
  namespaced: { css: '', applied: [{ description: 'the prefix', count: 7 }] },
  stylesheet: 'body {}',
  minified: { css: 'body{}', warnings: [], issue: undefined },
  stylesheetIssues: [],
  embeddedLicenseComments: [],
  ...overrides,
});

describe('formatBuildNotices', () => {
  it('should return both stylesheets when called with the build notices', () => {
    const artifacts = formatBuildNotices(notices());

    expect(artifacts.stylesheet).toBe('body {}');
    expect(artifacts.minifiedStylesheet).toBe('body{}');
  });

  it('should return the version facts from the inputs when called with the build notices', () => {
    const artifacts = formatBuildNotices(notices());

    expect(artifacts.version).toBe('0.2.1');
    expect(artifacts.bulmaVersion).toBe('1.0.4');
    expect(artifacts.startedAt).toBe(100);
  });

  it('should return third party notices naming the Bulma version when called with the build notices', () => {
    expect(formatBuildNotices(notices()).thirdPartyNotices).toContain(
      '## Bulma 1.0.4',
    );
  });

  it('should return the renaming record when the namespace stage applied a mapping', () => {
    expect(formatBuildNotices(notices()).appliedMappings).toEqual([
      { description: 'the prefix', count: 7 },
    ]);
  });

  it('should return the input issues, the stylesheet issues, and the minify issue when all three are present', () => {
    expect(
      formatBuildNotices(
        notices({
          inputs: inputs({ issues: ['bad manifest'] }),
          stylesheetIssues: ['leaked'],
          minified: { css: '', warnings: [], issue: 'clean-css failed' },
        }),
      ).issues,
    ).toEqual(['bad manifest', 'leaked', 'clean-css failed']);
  });

  it('should return no issues when every stage succeeded', () => {
    expect(formatBuildNotices(notices()).issues).toEqual([]);
  });

  it('should return the clean-css warnings and no issues when clean-css reported a warning', () => {
    const artifacts = formatBuildNotices(
      notices({
        minified: { css: '', warnings: ['odd selector'], issue: undefined },
      }),
    );

    expect(artifacts.warnings).toEqual(['odd selector']);
    expect(artifacts.issues).toEqual([]);
  });
});

import { describe, expect, it } from 'vitest';
import { computeBuildArtifacts } from './compute-build-artifacts.ts';
import type { BuildInputs } from './types/build-inputs.ts';

const inputs = (overrides: Partial<BuildInputs> = {}): BuildInputs => ({
  startedAt: 0,
  version: '0.2.1',
  homepage: 'https://example.com',
  bulmaVersion: '1.0.4',
  bulmaCopyright: 'Copyright (c) 2023 Jeremy Thomas',
  bulmaLicense: 'MIT License\n\nCopyright (c) 2023 Jeremy Thomas',
  paperShaders: {
    version: '0.0.82',
    license: 'Apache License',
    notice: 'Paper Shaders\n\nCopyright 2026 Paper\n',
  },
  paperShadersCopyright: 'Copyright 2026 Paper',
  stylesheet: 'body { color: red; }',
  runtime: '',
  minifiedRuntime: '',
  issues: [],
  ...overrides,
});

describe('computeBuildArtifacts', () => {
  it('should return a stylesheet headed by the charset and the banner when called with the build inputs', () => {
    const { stylesheet } = computeBuildArtifacts(inputs());

    expect(stylesheet.startsWith('@charset "UTF-8";\n/*!')).toBe(true);
    expect(stylesheet).toContain('oen-css v0.2.1');
    expect(stylesheet).toContain('body { color: red; }');
  });

  it('should return a minified stylesheet that keeps the banner when called with the build inputs', () => {
    const { minifiedStylesheet } = computeBuildArtifacts(inputs());

    expect(minifiedStylesheet).toContain('oen-css v0.2.1');
    expect(minifiedStylesheet).toContain('body{color:red}');
  });

  it('should return a stylesheet that contains `oen-fixed-grid` when the input stylesheet contains `bulma-fixed-grid`', () => {
    expect(
      computeBuildArtifacts(
        inputs({ stylesheet: 'a{container-name:bulma-fixed-grid}' }),
      ).stylesheet,
    ).toContain('oen-fixed-grid');
  });

  it('should return third party notices naming the Bulma version when called with the build inputs', () => {
    expect(computeBuildArtifacts(inputs()).thirdPartyNotices).toContain(
      '## Bulma 1.0.4',
    );
  });

  it('should return no issues when the stylesheet has no leftover bulma identifier', () => {
    expect(computeBuildArtifacts(inputs()).issues).toEqual([]);
  });

  it('should return an issue when the stylesheet contains `--bulma-primary`', () => {
    expect(
      computeBuildArtifacts(inputs({ stylesheet: '--bulma-primary: red;' }))
        .issues,
    ).not.toEqual([]);
  });

  it('should return the input issues when the inputs carry an issue', () => {
    expect(
      computeBuildArtifacts(inputs({ issues: ['bad manifest'] })).issues,
    ).toContain('bad manifest');
  });

  it('should return the parsed license comment when the stylesheet vendors a notice', () => {
    expect(
      computeBuildArtifacts(
        inputs({ stylesheet: 'body{}\n/*! minireset.css v0.0.6 */' }),
      ).embeddedLicenseComments,
    ).toEqual([
      {
        text: '/*! minireset.css v0.0.6 */',
        name: 'minireset.css v0.0.6',
        details: [],
      },
    ]);
  });
});

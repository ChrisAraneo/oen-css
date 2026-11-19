import { describe, expect, it } from 'vitest';
import type { BuildInputs } from '../types/build-inputs.ts';
import { patchBuildNamespace } from './patch-build-namespace.ts';

const inputs = (stylesheet: string): BuildInputs => ({
  startedAt: 0,
  version: '0.2.1',
  homepage: 'https://example.com',
  bulmaVersion: '1.0.4',
  bulmaCopyright: 'Copyright (c) 2023 Jeremy Thomas',
  bulmaLicense: 'MIT License',
  oenLicense: 'MIT License',
  stylesheet,
  issues: [],
});

describe('patchBuildNamespace', () => {
  it('should return `oen-fixed-grid` when the stylesheet declares `container-name: bulma-fixed-grid`', () => {
    expect(
      patchBuildNamespace(inputs('container-name: bulma-fixed-grid;'))
        .namespaced.css,
    ).toBe('container-name: oen-fixed-grid;');
  });

  it('should return two applied mappings when the stylesheet contains `bulma-fixed-grid`', () => {
    expect(
      patchBuildNamespace(inputs('bulma-fixed-grid')).namespaced.applied,
    ).toHaveLength(2);
  });

  it('should return the same inputs when called with the build inputs', () => {
    const given = inputs('body {}');

    expect(patchBuildNamespace(given).inputs).toBe(given);
  });

  it('should return `--bulma-primary` unchanged when the stylesheet declares a custom property', () => {
    expect(
      patchBuildNamespace(inputs('--bulma-primary: red;')).namespaced.css,
    ).toBe('--bulma-primary: red;');
  });

  it('should return the stylesheet unchanged when there is nothing to rename', () => {
    expect(patchBuildNamespace(inputs('body {}')).namespaced.css).toBe(
      'body {}',
    );
  });
});

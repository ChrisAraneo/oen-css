import { describe, expect, it } from 'vitest';
import type { BuildInputs } from '../types/build-inputs.ts';
import { patchBuildBanner } from './patch-build-banner.ts';

const INPUTS: BuildInputs = {
  startedAt: 0,
  version: '0.2.1',
  homepage: 'https://example.com',
  bulmaVersion: '1.0.4',
  bulmaCopyright: 'Copyright (c) 2023 Jeremy Thomas',
  bulmaLicense: 'MIT License',
  stylesheet: '',
  issues: [],
};

const namespaced = (css: string) => ({ css, applied: [] });

describe('patchBuildBanner', () => {
  it('should return the charset and the banner in front of the css when called with the namespaced stylesheet', () => {
    const { stylesheet } = patchBuildBanner({
      inputs: INPUTS,
      namespaced: namespaced('body {}'),
    });

    expect(stylesheet.startsWith('@charset "UTF-8";\n/*!')).toBe(true);
    expect(stylesheet.endsWith('body {}')).toBe(true);
  });

  it('should return a banner naming our version, license, and homepage when called with the build inputs', () => {
    expect(
      patchBuildBanner({ inputs: INPUTS, namespaced: namespaced('body {}') })
        .stylesheet,
    ).toContain('oen-css v0.2.1 | MIT License | https://example.com');
  });

  it('should return a banner naming the Bulma version and copyright when called with the build inputs', () => {
    const { stylesheet } = patchBuildBanner({
      inputs: INPUTS,
      namespaced: namespaced('body {}'),
    });

    expect(stylesheet).toContain('Built from Bulma v1.0.4');
    expect(stylesheet).toContain('Copyright (c) 2023 Jeremy Thomas');
  });

  it('should return the same inputs and renaming record when called with the earlier stage', () => {
    const given = { inputs: INPUTS, namespaced: namespaced('body {}') };
    const banner = patchBuildBanner(given);

    expect(banner.inputs).toBe(INPUTS);
    expect(banner.namespaced).toBe(given.namespaced);
  });

  it('should return one `@charset` line when the compiled stylesheet already had one', () => {
    expect(
      patchBuildBanner({
        inputs: INPUTS,
        namespaced: namespaced('@charset "UTF-8";\nbody {}'),
      }).stylesheet.match(/@charset/g),
    ).toHaveLength(1);
  });
});

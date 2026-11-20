import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateEveryArtifact } from './validate-every-artifact.ts';

const file = (text: string) => ({
  path: 'oen.css',
  text,
  issue: undefined,
});

const INPUTS: VerifyInputs = {
  stylesheet: file('body{}'),
  minifiedStylesheet: file('body{}'),
  oenLicense: file(''),
  bulmaLicense: file(''),
  thirdPartyNotices: file(''),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{"version":"1.0.4"}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
};

describe('validateEveryArtifact', () => {
  it('should return fifteen results when called with the inputs', () => {
    expect(validateEveryArtifact(INPUTS)).toHaveLength(15);
  });

  it('should return the check names in order, artifacts first, when called with the inputs', () => {
    expect(validateEveryArtifact(INPUTS).map(({ name }) => name)).toEqual([
      'package artifacts are present',
      'stylesheets start with @charset and the attribution banner',
      'no bulma identifiers leak outside the banner',
      'custom properties are namespaced with --oen-',
      'theme colors are the configured Oen palette',
      'theme fonts are the configured Oen stack',
      'type scale is the configured Oen scale',
      'controls are the configured Oen metrics',
      'component classes are unchanged from Bulma',
      'fixed grid container is namespaced',
      'minified output is smaller and still intact',
      "Bulma's license ships verbatim",
      'own license ships with the package',
      'notices embedded by Bulma survive minification',
      'output is Bulma, re-namespaced and re-themed, nothing else',
    ]);
  });

  it('should return a name and a detail for every check when called with the inputs', () => {
    expect(
      validateEveryArtifact(INPUTS).every(
        ({ name, detail }) => name !== '' && typeof detail === 'string',
      ),
    ).toBe(true);
  });

  it('should return at least one issue when the stylesheet is empty', () => {
    expect(
      validateEveryArtifact(INPUTS).filter(({ issue }) => issue !== undefined)
        .length,
    ).toBeGreaterThan(0);
  });

  it('should return no issue for the artifacts check when every artifact was read', () => {
    expect(
      validateEveryArtifact(INPUTS).find(
        ({ name }) => name === 'package artifacts are present',
      )?.issue,
    ).toBe(undefined);
  });
});

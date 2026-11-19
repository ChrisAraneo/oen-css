import { describe, expect, it } from 'vitest';
import type { BuildInputs } from '../types/build-inputs.ts';
import { findBuildEmbeddedNotices } from './find-build-embedded-notices.ts';

const INPUTS: BuildInputs = {
  startedAt: 0,
  version: '0.2.1',
  homepage: 'https://example.com',
  bulmaVersion: '1.0.4',
  bulmaCopyright: 'Copyright (c) 2023 Jeremy Thomas',
  bulmaLicense: 'MIT License',
  oenLicense: 'MIT License',
  stylesheet: '',
  issues: [],
};

const checked = (stylesheet: string) => ({
  inputs: INPUTS,
  namespaced: { css: stylesheet, applied: [] },
  stylesheet,
  minified: { css: '', warnings: [], issue: undefined },
  stylesheetIssues: [],
});

describe('findBuildEmbeddedNotices', () => {
  it('should return the parsed license comment when the stylesheet vendors a notice', () => {
    expect(
      findBuildEmbeddedNotices(
        checked('body {}\n/*! minireset.css v0.0.6 | MIT License */'),
      ).embeddedLicenseComments,
    ).toEqual([
      {
        text: '/*! minireset.css v0.0.6 | MIT License */',
        name: 'minireset.css v0.0.6',
        details: ['MIT License'],
      },
    ]);
  });

  it('should return an empty array when the stylesheet has no embedded notice', () => {
    expect(
      findBuildEmbeddedNotices(checked('body {}')).embeddedLicenseComments,
    ).toEqual([]);
  });

  it('should return an empty array when the only license comment is the leading banner', () => {
    expect(
      findBuildEmbeddedNotices(checked('/*! oen-css v0.2.1 */\nbody {}'))
        .embeddedLicenseComments,
    ).toEqual([]);
  });

  it('should return one comment when the expanded stylesheet carries one vendored notice', () => {
    expect(
      findBuildEmbeddedNotices(checked('body {}\n/*! vendored */'))
        .embeddedLicenseComments,
    ).toHaveLength(1);
  });

  it('should return the same inputs and stylesheet issues when called with the earlier stage', () => {
    const given = checked('body {}');
    const notices = findBuildEmbeddedNotices(given);

    expect(notices.inputs).toBe(INPUTS);
    expect(notices.stylesheetIssues).toBe(given.stylesheetIssues);
  });
});

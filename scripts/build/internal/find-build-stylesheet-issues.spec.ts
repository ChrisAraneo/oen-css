import { describe, expect, it } from 'vitest';
import type { BuildInputs } from '../types/build-inputs.ts';
import { findBuildStylesheetIssues } from './find-build-stylesheet-issues.ts';

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

const minification = (stylesheet: string, minifiedCss: string) => ({
  inputs: INPUTS,
  namespaced: { css: stylesheet, applied: [] },
  stylesheet,
  minified: { css: minifiedCss, warnings: [], issue: undefined },
});

describe('findBuildStylesheetIssues', () => {
  it('should return no stylesheet issues when both stylesheets are fully renamed', () => {
    expect(
      findBuildStylesheetIssues(minification('--oen-a: 1;', '--oen-a:1'))
        .stylesheetIssues,
    ).toEqual([]);
  });

  it('should return an issue naming `oen.css` when the expanded stylesheet keeps a bulma identifier', () => {
    expect(
      findBuildStylesheetIssues(minification('--bulma-a: 1;', '--oen-a:1'))
        .stylesheetIssues,
    ).toEqual([expect.stringContaining('oen.css')]);
  });

  it('should return an issue naming `oen.min.css` when the minified stylesheet keeps a bulma identifier', () => {
    expect(
      findBuildStylesheetIssues(minification('--oen-a: 1;', '--bulma-a:1'))
        .stylesheetIssues,
    ).toEqual([expect.stringContaining('oen.min.css')]);
  });

  it('should return two issues when both stylesheets keep a bulma identifier', () => {
    expect(
      findBuildStylesheetIssues(minification('--bulma-a: 1;', '--bulma-a:1'))
        .stylesheetIssues,
    ).toHaveLength(2);
  });

  it('should return no stylesheet issues when the only bulma reference is in the banner', () => {
    expect(
      findBuildStylesheetIssues(
        minification('/*! Built from Bulma v1.0.4 */\nbody {}', 'body{}'),
      ).stylesheetIssues,
    ).toEqual([]);
  });

  it('should return the same inputs and minified stylesheet when called with the earlier stage', () => {
    const given = minification('body {}', 'body{}');
    const checked = findBuildStylesheetIssues(given);

    expect(checked.inputs).toBe(INPUTS);
    expect(checked.minified).toBe(given.minified);
  });
});

import { describe, expect, it } from 'vitest';
import type { BuildInputs } from '../types/build-inputs.ts';
import { computeBuildMinification } from './compute-build-minification.ts';

const INPUTS: BuildInputs = {
  startedAt: 0,
  version: '0.2.1',
  homepage: 'https://example.com',
  bulmaVersion: '1.0.4',
  bulmaCopyright: 'Copyright (c) 2023 Jeremy Thomas',
  bulmaLicense: 'MIT License',
  paperShaders: {
    version: '0.0.82',
    license: 'Apache License',
    notice: 'Paper Shaders\n\nCopyright 2026 Paper\n',
  },
  paperShadersCopyright: 'Copyright 2026 Paper',
  stylesheet: '',
  runtime: '',
  minifiedRuntime: '',
  issues: [],
};

const banner = (stylesheet: string) => ({
  inputs: INPUTS,
  namespaced: { css: stylesheet, applied: [] },
  stylesheet,
  runtime: '',
  minifiedRuntime: '',
});

describe('computeBuildMinification', () => {
  it('should return the minified css when called with an expanded stylesheet', () => {
    expect(
      computeBuildMinification(banner('body { color: red; }')).minified.css,
    ).toBe('body{color:red}');
  });

  it('should return `undefined` as the minify issue when the stylesheet minifies cleanly', () => {
    expect(
      computeBuildMinification(banner('body { color: red; }')).minified.issue,
    ).toBe(undefined);
  });

  it('should return the expanded stylesheet unchanged when called with an expanded stylesheet', () => {
    expect(
      computeBuildMinification(banner('body { color: red; }')).stylesheet,
    ).toBe('body { color: red; }');
  });

  it('should return the same inputs and renaming record when called with the earlier stage', () => {
    const given = banner('body {}');
    const minification = computeBuildMinification(given);

    expect(minification.inputs).toBe(INPUTS);
    expect(minification.namespaced).toBe(given.namespaced);
  });

  it('should return minified css that keeps the license comment when the stylesheet contains one', () => {
    expect(
      computeBuildMinification(banner('/*! oen-css */\nbody { color: red; }'))
        .minified.css,
    ).toContain('/*! oen-css */');
  });
});

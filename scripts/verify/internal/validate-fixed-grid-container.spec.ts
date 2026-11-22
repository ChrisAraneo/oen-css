import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateFixedGridContainer } from './validate-fixed-grid-container.ts';

const file = (text: string) => ({
  path: 'oen.css',
  text,
  issue: undefined,
});

const inputs = (stylesheet: string): VerifyInputs => ({
  stylesheet: file(stylesheet),
  minifiedStylesheet: file(''),
  runtime: file(''),
  minifiedRuntime: file(''),
  oenLicense: file(''),
  bulmaLicense: file(''),
  thirdPartyNotices: file(''),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
});

const NAMESPACED_GRID =
  '.fixed-grid{container-name: oen-fixed-grid}\n@container oen-fixed-grid (min-width: 1px){.cell{}}';

describe('validateFixedGridContainer', () => {
  it('should return the check name and the query count when the container is named and queried', () => {
    const result = validateFixedGridContainer(inputs(NAMESPACED_GRID));

    expect(result.name).toBe('fixed grid container is namespaced');
    expect(result.detail).toBe('container-name + 1 @container queries');
  });

  it('should return `undefined` as the issue when the container is named and queried', () => {
    expect(validateFixedGridContainer(inputs(NAMESPACED_GRID)).issue).toBe(
      undefined,
    );
  });

  it('should return the container name issue when the container is still named `bulma-fixed-grid`', () => {
    expect(
      validateFixedGridContainer(
        inputs('.fixed-grid{container-name: bulma-fixed-grid}'),
      ).issue,
    ).toContain('expected `container-name: oen-fixed-grid`');
  });

  it('should return the query issue when nothing queries the container', () => {
    expect(
      validateFixedGridContainer(
        inputs('.fixed-grid{container-name: oen-fixed-grid}'),
      ).issue,
    ).toBe('expected @container queries against oen-fixed-grid');
  });

  it('should return a query count of 2 when the stylesheet carries two queries', () => {
    expect(
      validateFixedGridContainer(
        inputs(
          `${NAMESPACED_GRID}\n@container oen-fixed-grid (min-width: 2px){.cell{}}`,
        ),
      ).detail,
    ).toBe('container-name + 2 @container queries');
  });

  it('should return a query count of 0 when the stylesheet carries neither', () => {
    expect(validateFixedGridContainer(inputs('body{}')).detail).toBe(
      'container-name + 0 @container queries',
    );
  });
});

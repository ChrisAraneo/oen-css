import { describe, expect, it } from 'vitest';
import { patchOenNamespace } from './patch-oen-namespace.ts';

describe('patchOenNamespace', () => {
  it('should return `oen-fixed-grid` when the css declares `bulma-fixed-grid`', () => {
    expect(patchOenNamespace('container-name: bulma-fixed-grid;').css).toBe(
      'container-name: oen-fixed-grid;',
    );
  });

  it('should return the Oen section marker when the css carries the Bulma one', () => {
    expect(patchOenNamespace('/* Bulma Elements */').css).toBe(
      '/* Oen Elements */',
    );
  });

  it('should return `--bulma-primary` unchanged when the css declares it', () => {
    expect(patchOenNamespace('--bulma-primary: red;').css).toBe(
      '--bulma-primary: red;',
    );
  });

  it('should return two applied mappings when the css has nothing to rename', () => {
    expect(patchOenNamespace('body {}').applied).toHaveLength(2);
  });

  it('should return a count of 1 per mapping when the css carries one of each', () => {
    expect(
      patchOenNamespace('bulma-fixed-grid /* Bulma Grid */').applied,
    ).toEqual([
      { description: expect.stringContaining('fixed grid'), count: 1 },
      { description: expect.stringContaining('section marker'), count: 1 },
    ]);
  });

  it('should return a count of 0 for every mapping when there is nothing to rename', () => {
    expect(
      patchOenNamespace('body {}').applied.every(({ count }) => count === 0),
    ).toBe(true);
  });

  it('should return a count of 2 when the container name appears twice', () => {
    expect(
      patchOenNamespace('bulma-fixed-grid bulma-fixed-grid').applied.at(0),
    ).toEqual({ description: expect.stringContaining('fixed grid'), count: 2 });
  });
});

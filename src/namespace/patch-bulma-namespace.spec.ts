import { describe, expect, it } from 'vitest';
import { patchBulmaNamespace } from './patch-bulma-namespace.ts';

describe('patchBulmaNamespace', () => {
  it('should return `--bulma-primary` when the css declares `--oen-primary`', () => {
    expect(patchBulmaNamespace('--oen-primary: red;')).toBe(
      '--bulma-primary: red;',
    );
  });

  it('should return `bulma-fixed-grid` when the css declares `oen-fixed-grid`', () => {
    expect(patchBulmaNamespace('container-name: oen-fixed-grid;')).toBe(
      'container-name: bulma-fixed-grid;',
    );
  });

  it('should return the Bulma section marker when the css carries the Oen one', () => {
    expect(patchBulmaNamespace('/* Oen Elements */')).toBe(
      '/* Bulma Elements */',
    );
  });

  it('should return all three mappings renamed when the css carries one of each', () => {
    expect(
      patchBulmaNamespace('/* Oen Grid */ --oen-a: 1; oen-fixed-grid'),
    ).toBe('/* Bulma Grid */ --bulma-a: 1; bulma-fixed-grid');
  });

  it('should return the class names unchanged when the css carries them', () => {
    expect(patchBulmaNamespace('.button.is-primary {}')).toBe(
      '.button.is-primary {}',
    );
  });

  it('should return the css unchanged when there is nothing to rename', () => {
    expect(patchBulmaNamespace('body {}')).toBe('body {}');
  });
});

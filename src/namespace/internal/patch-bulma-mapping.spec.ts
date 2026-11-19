import { describe, expect, it } from 'vitest';
import type { NamespaceMapping } from '../types/namespace-mapping.ts';
import { patchBulmaMapping } from './patch-bulma-mapping.ts';

const MAPPING: NamespaceMapping = {
  description: 'test mapping',
  appliedBy: 'BUILD',
  bulmaPattern: /bulma-thing/g,
  oenReplacement: 'oen-thing',
  oenPattern: /oen-thing/g,
  bulmaReplacement: 'bulma-thing',
};

describe('patchBulmaMapping', () => {
  it('should return the bulma identifier when the css carries the oen one', () => {
    expect(patchBulmaMapping('a oen-thing b', MAPPING)).toBe('a bulma-thing b');
  });

  it('should return both identifiers renamed when the css carries two', () => {
    expect(patchBulmaMapping('oen-thing oen-thing', MAPPING)).toBe(
      'bulma-thing bulma-thing',
    );
  });

  it('should return the css unchanged when it carries no oen identifier', () => {
    expect(patchBulmaMapping('body {}', MAPPING)).toBe('body {}');
  });

  it('should return the css unchanged when it already carries the bulma identifier', () => {
    expect(patchBulmaMapping('bulma-thing', MAPPING)).toBe('bulma-thing');
  });

  it('should return the captured section name when the replacement carries a capture group', () => {
    expect(
      patchBulmaMapping('/* Oen Elements */', {
        ...MAPPING,
        oenPattern: /\/\* Oen ([A-Za-z][\w ]*) \*\//g,
        bulmaReplacement: '/* Bulma $1 */',
      }),
    ).toBe('/* Bulma Elements */');
  });
});

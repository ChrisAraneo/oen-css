import { describe, expect, it } from 'vitest';
import type { NamespaceMapping } from '../types/namespace-mapping.ts';
import { patchNamespaceMapping } from './patch-namespace-mapping.ts';

const MAPPING: NamespaceMapping = {
  description: 'custom property prefix',
  appliedBy: 'SASS',
  bulmaPattern: /--bulma-/g,
  oenReplacement: '--oen-',
  oenPattern: /--oen-/g,
  bulmaReplacement: '--bulma-',
};

describe('patchNamespaceMapping', () => {
  it('should return both identifiers renamed when the css carries two', () => {
    expect(
      patchNamespaceMapping(
        { css: '--bulma-a: 1;--bulma-b: 2;', applied: [] },
        MAPPING,
      ).css,
    ).toBe('--oen-a: 1;--oen-b: 2;');
  });

  it('should return a count of 2 when the mapping renamed two identifiers', () => {
    expect(
      patchNamespaceMapping(
        { css: '--bulma-a: 1;--bulma-b: 2;', applied: [] },
        MAPPING,
      ).applied,
    ).toEqual([{ description: 'custom property prefix', count: 2 }]);
  });

  it('should return a count of 0 when nothing matched', () => {
    expect(
      patchNamespaceMapping({ css: 'body {}', applied: [] }, MAPPING).applied,
    ).toEqual([{ description: 'custom property prefix', count: 0 }]);
  });

  it('should return the earlier mapping and the new one when a mapping was already applied', () => {
    expect(
      patchNamespaceMapping(
        {
          css: '--bulma-a: 1;',
          applied: [{ description: 'earlier', count: 7 }],
        },
        MAPPING,
      ).applied,
    ).toEqual([
      { description: 'earlier', count: 7 },
      { description: 'custom property prefix', count: 1 },
    ]);
  });

  it('should not change the input stylesheet when the mapping is applied', () => {
    const stylesheet = { css: '--bulma-a: 1;', applied: [] };
    patchNamespaceMapping(stylesheet, MAPPING);

    expect(stylesheet.css).toBe('--bulma-a: 1;');
  });
});

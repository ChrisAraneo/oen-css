import type { NamespaceMapping } from './types/namespace-mapping.ts';

export const BULMA_CUSTOM_PROPERTY_PREFIX = '--bulma-';

export const OEN_CUSTOM_PROPERTY_PREFIX = '--oen-';

export const NAMESPACE_MAPPINGS: readonly NamespaceMapping[] = Object.freeze([
  {
    description:
      'custom property prefix, set by $cssvars-prefix in src/namespace/',
    appliedBy: 'SASS',
    bulmaPattern: /--bulma-/g,
    oenReplacement: OEN_CUSTOM_PROPERTY_PREFIX,
    oenPattern: /--oen-/g,
    bulmaReplacement: BULMA_CUSTOM_PROPERTY_PREFIX,
  },
  {
    description:
      'fixed grid container name, hard-coded in bulma/sass/grid/grid.scss',
    appliedBy: 'BUILD',
    bulmaPattern: /\bbulma-fixed-grid\b/g,
    oenReplacement: 'oen-fixed-grid',
    oenPattern: /\boen-fixed-grid\b/g,
    bulmaReplacement: 'bulma-fixed-grid',
  },
  {
    description: 'section marker comments, such as /* Bulma Elements */',
    appliedBy: 'BUILD',
    bulmaPattern: /\/\* Bulma ([A-Za-z][\w ]*) \*\//g,
    oenReplacement: '/* Oen $1 */',
    oenPattern: /\/\* Oen ([A-Za-z][\w ]*) \*\//g,
    bulmaReplacement: '/* Bulma $1 */',
  },
]);

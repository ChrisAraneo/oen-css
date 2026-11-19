import { filter, reduce } from 'lodash-es';
import { NAMESPACE_MAPPINGS } from './consts.ts';
import { patchNamespaceMapping } from './internal/patch-namespace-mapping.ts';
import type { NamespaceMapping } from './types/namespace-mapping.ts';
import type { NamespacedStylesheet } from './types/namespaced-stylesheet.ts';

const NOTHING_RENAMED_YET: readonly [] = Object.freeze([]);

const MAPPINGS_SASS_CANNOT_APPLY: readonly NamespaceMapping[] = Object.freeze(
  filter(NAMESPACE_MAPPINGS, (mapping) => mapping.appliedBy === 'BUILD'),
);

export const patchOenNamespace = (css: string): NamespacedStylesheet =>
  reduce<NamespaceMapping, NamespacedStylesheet>(
    MAPPINGS_SASS_CANNOT_APPLY,
    patchNamespaceMapping,
    {
      css,
      applied: NOTHING_RENAMED_YET,
    },
  );

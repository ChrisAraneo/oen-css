import { reduce } from 'lodash-es';
import { MAPPINGS_SASS_CANNOT_APPLY } from './consts.ts';
import { patchNamespaceMapping } from './internal/patch-namespace-mapping.ts';
import type { NamespaceMapping } from './types/namespace-mapping.ts';
import type { NamespacedStylesheet } from './types/namespaced-stylesheet.ts';

const NOTHING_RENAMED_YET: readonly [] = Object.freeze([]);

export const patchOenNamespace = (css: string): NamespacedStylesheet =>
  reduce<NamespaceMapping, NamespacedStylesheet>(
    MAPPINGS_SASS_CANNOT_APPLY,
    patchNamespaceMapping,
    {
      css,
      applied: NOTHING_RENAMED_YET,
    },
  );

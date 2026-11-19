import { reduce } from 'lodash-es';
import { NAMESPACE_MAPPINGS } from './consts.ts';
import { patchBulmaMapping } from './internal/patch-bulma-mapping.ts';
import type { NamespaceMapping } from './types/namespace-mapping.ts';

export const patchBulmaNamespace = (css: string): string =>
  reduce<NamespaceMapping, string>(NAMESPACE_MAPPINGS, patchBulmaMapping, css);

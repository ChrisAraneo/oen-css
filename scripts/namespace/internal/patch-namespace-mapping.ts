import { replace } from 'lodash-es';
import { countMatches } from '../../common/count-matches.ts';
import type { NamespaceMapping } from '../types/namespace-mapping.ts';
import type { NamespacedStylesheet } from '../types/namespaced-stylesheet.ts';

export const patchNamespaceMapping = (
  { css, applied }: NamespacedStylesheet,
  { description, bulmaPattern, oenReplacement }: NamespaceMapping,
): NamespacedStylesheet => ({
  css: replace(css, bulmaPattern, oenReplacement),
  applied: [
    ...applied,
    { description, count: countMatches(css, bulmaPattern) },
  ],
});

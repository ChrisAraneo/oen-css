import { replace } from 'lodash-es';
import type { NamespaceMapping } from '../types/namespace-mapping.ts';

export const patchBulmaMapping = (
  css: string,
  { oenPattern, bulmaReplacement }: NamespaceMapping,
): string => replace(css, oenPattern, bulmaReplacement);

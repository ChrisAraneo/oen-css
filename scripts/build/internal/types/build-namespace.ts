import type { NamespacedStylesheet } from '../../../../src/namespace/types/namespaced-stylesheet.ts';
import type { BuildInputs } from '../../types/build-inputs.ts';

export interface BuildNamespace {
  readonly inputs: BuildInputs;
  readonly namespaced: NamespacedStylesheet;
}

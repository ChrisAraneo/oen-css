import type { NamespacedStylesheet } from '../../../../src/namespace/types/namespaced-stylesheet.ts';
import type { BuildInputs } from '../../types/build-inputs.ts';

export interface BuildBanner {
  readonly inputs: BuildInputs;
  readonly namespaced: NamespacedStylesheet;
  readonly stylesheet: string;
  readonly runtime: string;
  readonly minifiedRuntime: string;
}

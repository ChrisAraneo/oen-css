import type { NamespacedStylesheet } from '../../../namespace/types/namespaced-stylesheet.ts';
import type { BuildInputs } from '../../types/build-inputs.ts';
import type { MinifiedStylesheet } from './minified-stylesheet.ts';

export interface BuildMinification {
  readonly inputs: BuildInputs;
  readonly namespaced: NamespacedStylesheet;
  readonly stylesheet: string;
  readonly minified: MinifiedStylesheet;
}

import { patchOenNamespace } from '../../namespace/patch-oen-namespace.ts';
import type { BuildInputs } from '../types/build-inputs.ts';
import type { BuildNamespace } from './types/build-namespace.ts';

export const patchBuildNamespace = (inputs: BuildInputs): BuildNamespace => ({
  inputs,
  namespaced: patchOenNamespace(inputs.stylesheet),
});

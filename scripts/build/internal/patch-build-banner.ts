import { formatOenBanner } from '../../../src/banner/format-oen-banner.ts';
import { patchStylesheetHeader } from '../../../src/banner/patch-stylesheet-header.ts';
import type { BuildBanner } from './types/build-banner.ts';
import type { BuildNamespace } from './types/build-namespace.ts';

export const patchBuildBanner = ({
  inputs,
  namespaced,
}: BuildNamespace): BuildBanner => ({
  inputs,
  namespaced,
  stylesheet: patchStylesheetHeader(namespaced.css, formatOenBanner(inputs)),
});

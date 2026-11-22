import { pipe } from 'remeda';
import { formatOenBanner } from '../../../src/banner/format-oen-banner.ts';
import { formatOenRuntimeBanner } from '../../../src/banner/format-oen-runtime-banner.ts';
import { patchRuntimeHeader } from '../../../src/banner/patch-runtime-header.ts';
import { patchStylesheetHeader } from '../../../src/banner/patch-stylesheet-header.ts';
import type { BuildBanner } from './types/build-banner.ts';
import type { BuildNamespace } from './types/build-namespace.ts';

export const patchBuildBanner = ({
  inputs,
  namespaced,
}: BuildNamespace): BuildBanner =>
  pipe(
    {
      stylesheetBanner: formatOenBanner(inputs),
      runtimeBanner: formatOenRuntimeBanner({
        version: inputs.version,
        homepage: inputs.homepage,
        paperShadersVersion: inputs.paperShaders.version,
        paperShadersCopyright: inputs.paperShadersCopyright,
      }),
    },
    ({ stylesheetBanner, runtimeBanner }) => ({
      inputs,
      namespaced,
      stylesheet: patchStylesheetHeader(namespaced.css, stylesheetBanner),
      runtime: patchRuntimeHeader(inputs.runtime, runtimeBanner),
      minifiedRuntime: patchRuntimeHeader(
        inputs.minifiedRuntime,
        runtimeBanner,
      ),
    }),
  );

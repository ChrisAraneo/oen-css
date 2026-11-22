import type { CompiledRuntime } from '../../../common/runtime/types/compiled-runtime.ts';
import type { CompiledStylesheet } from '../../../common/sass/types/compiled-stylesheet.ts';
import type { TextFile } from '../../../common/types/text-file.ts';

export interface BuildFiles {
  readonly oenManifest: TextFile;
  readonly bulmaManifest: TextFile;
  readonly bulmaLicense: TextFile;
  readonly paperShadersManifest: TextFile;
  readonly paperShadersLicense: TextFile;
  readonly paperShadersNotice: TextFile;
  readonly stylesheet: CompiledStylesheet;
  readonly runtime: CompiledRuntime;
}

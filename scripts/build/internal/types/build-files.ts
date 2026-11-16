import type { TextFile } from '../../../common/types/text-file.ts';
import type { CompiledStylesheet } from '../../../sass/types/compiled-stylesheet.ts';

export interface BuildFiles {
  readonly oenManifest: TextFile;
  readonly bulmaManifest: TextFile;
  readonly bulmaLicense: TextFile;
  readonly oenLicense: TextFile;
  readonly stylesheet: CompiledStylesheet;
}

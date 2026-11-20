import type { CompiledStylesheet } from '../../common/sass/types/compiled-stylesheet.ts';
import type { TextFile } from '../../common/types/text-file.ts';

export interface VerifyInputs {
  readonly stylesheet: TextFile;
  readonly minifiedStylesheet: TextFile;
  readonly oenLicense: TextFile;
  readonly bulmaLicense: TextFile;
  readonly thirdPartyNotices: TextFile;
  readonly repositoryBulmaLicense: TextFile;
  readonly bulmaManifest: TextFile;
  readonly upstreamBulmaStylesheet: CompiledStylesheet;
}

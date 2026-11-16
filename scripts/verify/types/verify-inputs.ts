import type { TextFile } from '../../common/types/text-file.ts';
import type { CompiledStylesheet } from '../../sass/types/compiled-stylesheet.ts';

export interface VerifyInputs {
  readonly stylesheet: TextFile;
  readonly minifiedStylesheet: TextFile;
  readonly oenLicense: TextFile;
  readonly bulmaLicense: TextFile;
  readonly thirdPartyNotices: TextFile;
  readonly repositoryOenLicense: TextFile;
  readonly repositoryBulmaLicense: TextFile;
  readonly bulmaManifest: TextFile;
  readonly upstreamBulmaStylesheet: CompiledStylesheet;
}

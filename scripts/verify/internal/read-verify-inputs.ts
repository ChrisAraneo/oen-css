import {
  BULMA_LICENSE_FILE,
  BULMA_MANIFEST,
  OEN_LICENSE_FILE,
} from '../../common/consts.ts';
import {
  BULMA_LICENSE,
  OEN_LICENSE,
  OEN_MINIFIED_STYLESHEET,
  OEN_STYLESHEET,
  THIRD_PARTY_NOTICES,
} from '../../common/dist/consts.ts';
import { readDistFile } from '../../common/dist/read-dist-file.ts';
import { readTextFile } from '../../common/read-text-file.ts';
import { readCompiledBulmaStylesheet } from '../../common/sass/read-compiled-bulma-stylesheet.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';

export const readVerifyInputs = (): Promise<VerifyInputs> =>
  Promise.all([
    readDistFile(OEN_STYLESHEET),
    readDistFile(OEN_MINIFIED_STYLESHEET),
    readDistFile(OEN_LICENSE),
    readDistFile(BULMA_LICENSE),
    readDistFile(THIRD_PARTY_NOTICES),
    readTextFile(OEN_LICENSE_FILE),
    readTextFile(BULMA_LICENSE_FILE),
    readTextFile(BULMA_MANIFEST),
  ]).then(
    ([
      stylesheet,
      minifiedStylesheet,
      oenLicense,
      bulmaLicense,
      thirdPartyNotices,
      repositoryOenLicense,
      repositoryBulmaLicense,
      bulmaManifest,
    ]) => ({
      stylesheet,
      minifiedStylesheet,
      oenLicense,
      bulmaLicense,
      thirdPartyNotices,
      repositoryOenLicense,
      repositoryBulmaLicense,
      bulmaManifest,
      upstreamBulmaStylesheet: readCompiledBulmaStylesheet(),
    }),
  );

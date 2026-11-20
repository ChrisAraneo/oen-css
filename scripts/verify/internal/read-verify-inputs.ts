import { BULMA_LICENSE_FILE, BULMA_MANIFEST } from '../../common/consts.ts';
import {
  BULMA_LICENSE,
  OEN_LICENSE,
  OEN_MINIFIED_STYLESHEET,
  OEN_STYLESHEET,
  THIRD_PARTY_NOTICES,
} from '../../common/package/consts.ts';
import { readPackageFile } from '../../common/package/read-package-file.ts';
import { readTextFile } from '../../common/read-text-file.ts';
import { readCompiledBulmaStylesheet } from '../../common/sass/read-compiled-bulma-stylesheet.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';

export const readVerifyInputs = (): Promise<VerifyInputs> =>
  Promise.all([
    readPackageFile(OEN_STYLESHEET),
    readPackageFile(OEN_MINIFIED_STYLESHEET),
    readPackageFile(OEN_LICENSE),
    readPackageFile(BULMA_LICENSE),
    readPackageFile(THIRD_PARTY_NOTICES),
    readTextFile(BULMA_LICENSE_FILE),
    readTextFile(BULMA_MANIFEST),
  ]).then(
    ([
      stylesheet,
      minifiedStylesheet,
      oenLicense,
      bulmaLicense,
      thirdPartyNotices,
      repositoryBulmaLicense,
      bulmaManifest,
    ]) => ({
      stylesheet,
      minifiedStylesheet,
      oenLicense,
      bulmaLicense,
      thirdPartyNotices,
      repositoryBulmaLicense,
      bulmaManifest,
      upstreamBulmaStylesheet: readCompiledBulmaStylesheet(),
    }),
  );

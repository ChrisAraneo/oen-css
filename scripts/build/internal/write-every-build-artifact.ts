import {
  BULMA_LICENSE,
  OEN_MINIFIED_STYLESHEET,
  OEN_STYLESHEET,
  THIRD_PARTY_NOTICES,
} from '../../common/package/consts.ts';
import { writePackageFile } from '../../common/package/write-package-file.ts';
import type { BuildArtifacts } from '../types/build-artifacts.ts';

export const writeEveryBuildArtifact = (
  artifacts: BuildArtifacts,
): Promise<BuildArtifacts> =>
  Promise.all([
    writePackageFile(OEN_STYLESHEET, artifacts.stylesheet),
    writePackageFile(OEN_MINIFIED_STYLESHEET, artifacts.minifiedStylesheet),
    writePackageFile(BULMA_LICENSE, artifacts.bulmaLicense),
    writePackageFile(THIRD_PARTY_NOTICES, artifacts.thirdPartyNotices),
  ]).then(() => artifacts);

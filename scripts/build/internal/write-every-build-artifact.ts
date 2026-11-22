import {
  BULMA_LICENSE,
  OEN_MINIFIED_RUNTIME,
  OEN_MINIFIED_STYLESHEET,
  OEN_RUNTIME,
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
    writePackageFile(OEN_RUNTIME, artifacts.runtime),
    writePackageFile(OEN_MINIFIED_RUNTIME, artifacts.minifiedRuntime),
    writePackageFile(BULMA_LICENSE, artifacts.bulmaLicense),
    writePackageFile(THIRD_PARTY_NOTICES, artifacts.thirdPartyNotices),
  ]).then(() => artifacts);

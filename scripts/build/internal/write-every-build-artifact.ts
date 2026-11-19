import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { REPOSITORY_ROOT } from '../../common/consts.ts';
import {
  BULMA_LICENSE,
  OEN_LICENSE,
  OEN_MINIFIED_STYLESHEET,
  OEN_STYLESHEET,
  THIRD_PARTY_NOTICES,
} from '../../common/dist/consts.ts';
import { createDistDirectory } from '../../common/dist/create-dist-directory.ts';
import { writeDistFile } from '../../common/dist/write-dist-file.ts';
import type { BuildArtifacts } from '../types/build-artifacts.ts';

const THIRD_PARTY_NOTICES_FILE: string = resolve(
  REPOSITORY_ROOT,
  'THIRD-PARTY-NOTICES.md',
);

export const writeEveryBuildArtifact = (
  artifacts: BuildArtifacts,
): Promise<BuildArtifacts> =>
  createDistDirectory()
    .then(() =>
      Promise.all([
        writeDistFile(OEN_STYLESHEET, artifacts.stylesheet),
        writeDistFile(OEN_MINIFIED_STYLESHEET, artifacts.minifiedStylesheet),
        writeDistFile(OEN_LICENSE, artifacts.oenLicense),
        writeDistFile(BULMA_LICENSE, artifacts.bulmaLicense),
        writeDistFile(THIRD_PARTY_NOTICES, artifacts.thirdPartyNotices),
        writeFile(
          THIRD_PARTY_NOTICES_FILE,
          artifacts.thirdPartyNotices,
          'utf8',
        ),
      ]),
    )
    .then(() => artifacts);

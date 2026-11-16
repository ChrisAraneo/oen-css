import { readTextFile } from '../../common/read-text-file.ts';
import {
  BULMA_LICENSE_FILE,
  BULMA_MANIFEST,
  OEN_LICENSE_FILE,
  OEN_MANIFEST,
} from '../../consts.ts';
import { readCompiledOenStylesheet } from '../../sass/read-compiled-oen-stylesheet.ts';
import type { BuildInputs } from '../types/build-inputs.ts';
import { toBuildInputs } from './to-build-inputs.ts';

export const readBuildInputs = (now: () => number): Promise<BuildInputs> =>
  Promise.all([
    readTextFile(OEN_MANIFEST),
    readTextFile(BULMA_MANIFEST),
    readTextFile(BULMA_LICENSE_FILE),
    readTextFile(OEN_LICENSE_FILE),
  ]).then(([oenManifest, bulmaManifest, bulmaLicense, oenLicense]) =>
    toBuildInputs(
      {
        oenManifest,
        bulmaManifest,
        bulmaLicense,
        oenLicense,
        stylesheet: readCompiledOenStylesheet(),
      },
      now(),
    ),
  );

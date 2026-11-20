import { resolve } from 'node:path';
import {
  BULMA_LICENSE_FILE,
  BULMA_MANIFEST,
  REPOSITORY_ROOT,
} from '../../common/consts.ts';
import { readTextFile } from '../../common/read-text-file.ts';
import { readCompiledOenStylesheet } from '../../common/sass/read-compiled-oen-stylesheet.ts';
import type { BuildInputs } from '../types/build-inputs.ts';
import { toBuildInputs } from './to-build-inputs.ts';

const OEN_MANIFEST: string = resolve(REPOSITORY_ROOT, 'package.json');

export const readBuildInputs = (now: () => number): Promise<BuildInputs> =>
  Promise.all([
    readTextFile(OEN_MANIFEST),
    readTextFile(BULMA_MANIFEST),
    readTextFile(BULMA_LICENSE_FILE),
  ]).then(([oenManifest, bulmaManifest, bulmaLicense]) =>
    toBuildInputs(
      {
        oenManifest,
        bulmaManifest,
        bulmaLicense,
        stylesheet: readCompiledOenStylesheet(),
      },
      now(),
    ),
  );

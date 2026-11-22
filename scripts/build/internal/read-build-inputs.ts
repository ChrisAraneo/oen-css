import { resolve } from 'node:path';
import {
  BULMA_LICENSE_FILE,
  BULMA_MANIFEST,
  PAPER_SHADERS_LICENSE_FILE,
  PAPER_SHADERS_MANIFEST,
  PAPER_SHADERS_NOTICE_FILE,
  REPOSITORY_ROOT,
} from '../../common/consts.ts';
import { readTextFile } from '../../common/read-text-file.ts';
import { readCompiledOenRuntime } from '../../common/runtime/read-compiled-oen-runtime.ts';
import { readCompiledOenStylesheet } from '../../common/sass/read-compiled-oen-stylesheet.ts';
import type { BuildInputs } from '../types/build-inputs.ts';
import { toBuildInputs } from './to-build-inputs.ts';

const OEN_MANIFEST: string = resolve(REPOSITORY_ROOT, 'package.json');

export const readBuildInputs = (now: () => number): Promise<BuildInputs> =>
  Promise.all([
    readTextFile(OEN_MANIFEST),
    readTextFile(BULMA_MANIFEST),
    readTextFile(BULMA_LICENSE_FILE),
    readTextFile(PAPER_SHADERS_MANIFEST),
    readTextFile(PAPER_SHADERS_LICENSE_FILE),
    readTextFile(PAPER_SHADERS_NOTICE_FILE),
  ]).then(
    ([
      oenManifest,
      bulmaManifest,
      bulmaLicense,
      paperShadersManifest,
      paperShadersLicense,
      paperShadersNotice,
    ]) =>
      toBuildInputs(
        {
          oenManifest,
          bulmaManifest,
          bulmaLicense,
          paperShadersManifest,
          paperShadersLicense,
          paperShadersNotice,
          stylesheet: readCompiledOenStylesheet(),
          runtime: readCompiledOenRuntime(),
        },
        now(),
      ),
  );

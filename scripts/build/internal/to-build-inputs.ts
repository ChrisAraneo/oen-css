import { compact } from 'lodash-es';
import { pipe } from 'remeda';
import {
  BULMA_COPYRIGHT_PREFIX,
  PAPER_SHADERS_COPYRIGHT_PREFIX,
} from '../../../src/licenses/consts.ts';
import { findCopyrightLine } from '../../../src/licenses/find-copyright-line.ts';
import {
  OEN_MINIFIED_RUNTIME,
  OEN_RUNTIME,
} from '../../common/package/consts.ts';
import { parsePackageManifest } from '../../common/parse-package-manifest.ts';
import type { BuildInputs } from '../types/build-inputs.ts';
import { formatBulmaVersionMismatch } from './format-bulma-version-mismatch.ts';
import { formatEmptyRuntimeIssue } from './format-empty-runtime-issue.ts';
import { formatMissingCopyrightIssue } from './format-missing-copyright-issue.ts';
import { toBannerHomepage } from './to-banner-homepage.ts';
import type { BuildFiles } from './types/build-files.ts';

const NO_COPYRIGHT_LINE = '';

export const toBuildInputs = (
  {
    oenManifest,
    bulmaManifest,
    bulmaLicense,
    paperShadersManifest,
    paperShadersLicense,
    paperShadersNotice,
    stylesheet,
    runtime,
  }: BuildFiles,
  startedAt: number,
): BuildInputs =>
  pipe(
    {
      oen: parsePackageManifest(oenManifest.text),
      bulma: parsePackageManifest(bulmaManifest.text),
      copyrightLine: findCopyrightLine(
        bulmaLicense.text,
        BULMA_COPYRIGHT_PREFIX,
      ),
      paperShadersCopyright: findCopyrightLine(
        paperShadersNotice.text,
        PAPER_SHADERS_COPYRIGHT_PREFIX,
      ),
    },
    ({ oen, bulma, copyrightLine, paperShadersCopyright }) => ({
      startedAt,
      version: oen.version,
      homepage: toBannerHomepage(oen.homepage),
      bulmaVersion: bulma.version,
      bulmaCopyright: copyrightLine ?? NO_COPYRIGHT_LINE,
      bulmaLicense: bulmaLicense.text,
      paperShaders: {
        version: parsePackageManifest(paperShadersManifest.text).version,
        license: paperShadersLicense.text,
        notice: paperShadersNotice.text,
      },
      paperShadersCopyright: paperShadersCopyright ?? NO_COPYRIGHT_LINE,
      stylesheet: stylesheet.css,
      runtime: runtime.code,
      minifiedRuntime: runtime.minifiedCode,
      issues: compact([
        oenManifest.issue,
        bulmaManifest.issue,
        bulmaLicense.issue,
        paperShadersManifest.issue,
        paperShadersLicense.issue,
        paperShadersNotice.issue,
        stylesheet.issue,
        runtime.issue,
        formatEmptyRuntimeIssue(runtime.code, OEN_RUNTIME),
        formatEmptyRuntimeIssue(runtime.minifiedCode, OEN_MINIFIED_RUNTIME),
        formatBulmaVersionMismatch(oen.bulmaVersion, bulma.version),
        formatMissingCopyrightIssue(copyrightLine),
      ]),
    }),
  );

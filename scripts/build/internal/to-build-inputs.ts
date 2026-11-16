import { compact } from 'lodash-es';
import { pipe } from 'remeda';
import { parsePackageManifest } from '../../common/parse-package-manifest.ts';
import { findCopyrightLine } from '../../licenses/find-copyright-line.ts';
import type { BuildInputs } from '../types/build-inputs.ts';
import { formatBulmaVersionMismatch } from './format-bulma-version-mismatch.ts';
import { formatMissingCopyrightProblem } from './format-missing-copyright-problem.ts';
import { toCanonicalHomepage } from './to-canonical-homepage.ts';
import type { BuildFiles } from './types/build-files.ts';

const NO_COPYRIGHT_LINE = '';

export const toBuildInputs = (
  {
    oenManifest,
    bulmaManifest,
    bulmaLicense,
    oenLicense,
    stylesheet,
  }: BuildFiles,
  startedAt: number,
): BuildInputs =>
  pipe(
    {
      oen: parsePackageManifest(oenManifest.text),
      bulma: parsePackageManifest(bulmaManifest.text),
      copyrightLine: findCopyrightLine(bulmaLicense.text),
    },
    ({ oen, bulma, copyrightLine }) => ({
      startedAt,
      version: oen.version,
      homepage: toCanonicalHomepage(oen.homepage),
      bulmaVersion: bulma.version,
      bulmaCopyright: copyrightLine ?? NO_COPYRIGHT_LINE,
      bulmaLicense: bulmaLicense.text,
      oenLicense: oenLicense.text,
      stylesheet: stylesheet.css,
      problems: compact([
        oenManifest.problem,
        bulmaManifest.problem,
        bulmaLicense.problem,
        oenLicense.problem,
        stylesheet.problem,
        formatBulmaVersionMismatch(oen.bulmaVersion, bulma.version),
        formatMissingCopyrightProblem(copyrightLine),
      ]),
    }),
  );

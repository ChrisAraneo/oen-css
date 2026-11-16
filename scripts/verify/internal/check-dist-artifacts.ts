import { filter, isString, join, map } from 'lodash-es';
import { basename } from 'node:path';
import { pipe } from 'remeda';
import { EVERY_DIST_FILE } from '../../dist/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatMissingDistFilesProblem } from './format-missing-dist-files-problem.ts';

const CHECK_NAME = 'dist artifacts are present';

export const checkDistArtifacts = ({
  stylesheet,
  minifiedStylesheet,
  oenLicense,
  bulmaLicense,
  thirdPartyNotices,
}: VerifyInputs): CheckResult =>
  pipe(
    [
      stylesheet,
      minifiedStylesheet,
      oenLicense,
      bulmaLicense,
      thirdPartyNotices,
    ],
    (files) => filter(files, (file) => isString(file.problem)),
    (unreadable) => map(unreadable, (file) => basename(file.path)),
    (missing) => ({
      name: CHECK_NAME,
      detail: join(EVERY_DIST_FILE, ', '),
      problem: formatMissingDistFilesProblem(missing),
    }),
  );

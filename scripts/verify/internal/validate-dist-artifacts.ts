import { join } from 'lodash-es';
import { pipe } from 'remeda';
import { EVERY_DIST_FILE } from '../../common/dist/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { filterUnreadableDistFiles } from './filter-unreadable-dist-files.ts';
import { formatMissingDistFilesIssue } from './format-missing-dist-files-issue.ts';
import { toDistFileNames } from './to-dist-file-names.ts';

const CHECK_NAME = 'dist artifacts are present';

export const validateDistArtifacts = ({
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
    filterUnreadableDistFiles,
    toDistFileNames,
    (missing) => ({
      name: CHECK_NAME,
      detail: join(EVERY_DIST_FILE, ', '),
      issue: formatMissingDistFilesIssue(missing),
    }),
  );

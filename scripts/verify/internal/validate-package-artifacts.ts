import { join } from 'lodash-es';
import { pipe } from 'remeda';
import { EVERY_PACKAGE_FILE } from '../../common/package/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { filterUnreadablePackageFiles } from './filter-unreadable-package-files.ts';
import { formatMissingPackageFilesIssue } from './format-missing-package-files-issue.ts';
import { toPackageFileNames } from './to-package-file-names.ts';

const CHECK_NAME = 'package artifacts are present';

export const validatePackageArtifacts = ({
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
    filterUnreadablePackageFiles,
    toPackageFileNames,
    (missing) => ({
      name: CHECK_NAME,
      detail: join(EVERY_PACKAGE_FILE, ', '),
      issue: formatMissingPackageFilesIssue(missing),
    }),
  );

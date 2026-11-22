import { BULMA_COPYRIGHT_PREFIX } from '../../../src/licenses/consts.ts';
import { findCopyrightLine } from '../../../src/licenses/find-copyright-line.ts';
import {
  BULMA_LICENSE,
  THIRD_PARTY_NOTICES,
} from '../../common/package/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { NO_COPYRIGHT_LINE } from './consts.ts';
import { formatBulmaLicenseIssue } from './format-bulma-license-issue.ts';

const CHECK_NAME = "Bulma's license ships verbatim";

export const validateBulmaLicense = ({
  bulmaLicense,
  repositoryBulmaLicense,
  thirdPartyNotices,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: `${findCopyrightLine(repositoryBulmaLicense.text, BULMA_COPYRIGHT_PREFIX) ?? NO_COPYRIGHT_LINE} (reproduced in ${BULMA_LICENSE} and ${THIRD_PARTY_NOTICES})`,
  issue: formatBulmaLicenseIssue(
    bulmaLicense.text,
    repositoryBulmaLicense.text,
    thirdPartyNotices.text,
  ),
});

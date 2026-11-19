import { findCopyrightLine } from '../../../src/licenses/find-copyright-line.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { NO_COPYRIGHT_LINE } from './consts.ts';
import { formatOenLicenseIssue } from './format-oen-license-issue.ts';

const CHECK_NAME = 'own license ships alongside it';

export const validateOenLicense = ({
  oenLicense,
  repositoryOenLicense,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: findCopyrightLine(repositoryOenLicense.text) ?? NO_COPYRIGHT_LINE,
  issue: formatOenLicenseIssue(oenLicense.text, repositoryOenLicense.text),
});

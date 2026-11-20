import { findCopyrightLine } from '../../../src/licenses/find-copyright-line.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { NO_COPYRIGHT_LINE } from './consts.ts';
import { formatOenLicenseIssue } from './format-oen-license-issue.ts';

const CHECK_NAME = 'own license ships with the package';

export const validateOenLicense = ({
  oenLicense,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: findCopyrightLine(oenLicense.text) ?? NO_COPYRIGHT_LINE,
  issue: formatOenLicenseIssue(oenLicense.text),
});

import { isEqual } from 'lodash-es';
import { match } from 'ts-pattern';
import { OEN_LICENSE } from '../../dist/consts.ts';
import { findCopyrightLine } from '../../licenses/find-copyright-line.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { NO_COPYRIGHT_LINE } from './consts.ts';

const CHECK_NAME = 'own license ships alongside it';

export const checkOenLicense = ({
  oenLicense,
  repositoryOenLicense,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: findCopyrightLine(repositoryOenLicense.text) ?? NO_COPYRIGHT_LINE,
  problem: match(isEqual(oenLicense.text, repositoryOenLicense.text))
    .with(
      false,
      () => `dist/${OEN_LICENSE} differs from the repository LICENSE`,
    )
    .otherwise(() => undefined),
});

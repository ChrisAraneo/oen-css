import { includes, isEqual, trim } from 'lodash-es';
import { match } from 'ts-pattern';
import { BULMA_LICENSE, THIRD_PARTY_NOTICES } from '../../dist/consts.ts';
import { findCopyrightLine } from '../../licenses/find-copyright-line.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { NO_COPYRIGHT_LINE } from './consts.ts';

const CHECK_NAME = "Bulma's license ships verbatim";
const COPYRIGHT_PREFIX = 'Copyright (c)';
const PERMISSION_SENTENCE = 'Permission is hereby granted';

const formatBulmaLicenseProblem = (
  shipped: string,
  upstream: string,
  notices: string,
): string | undefined =>
  match({
    verbatim: isEqual(shipped, upstream),
    mit:
      includes(shipped, COPYRIGHT_PREFIX) &&
      includes(shipped, PERMISSION_SENTENCE),
    documented: includes(notices, trim(upstream)),
  })
    .with(
      { verbatim: false },
      () => `dist/${BULMA_LICENSE} differs from node_modules/bulma/LICENSE`,
    )
    .with(
      { mit: false },
      () => `dist/${BULMA_LICENSE} does not look like the MIT notice`,
    )
    .with(
      { documented: false },
      () => `dist/${THIRD_PARTY_NOTICES} does not reproduce the Bulma notice`,
    )
    .otherwise(() => undefined);

export const checkBulmaLicense = ({
  bulmaLicense,
  repositoryBulmaLicense,
  thirdPartyNotices,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: `${findCopyrightLine(repositoryBulmaLicense.text) ?? NO_COPYRIGHT_LINE} (reproduced in ${BULMA_LICENSE} and ${THIRD_PARTY_NOTICES})`,
  problem: formatBulmaLicenseProblem(
    bulmaLicense.text,
    repositoryBulmaLicense.text,
    thirdPartyNotices.text,
  ),
});

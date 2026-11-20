import { includes, isEqual, trim } from 'lodash-es';
import { match } from 'ts-pattern';
import {
  BULMA_LICENSE,
  THIRD_PARTY_NOTICES,
} from '../../common/package/consts.ts';
import { isMitNotice } from './is-mit-notice.ts';

export const formatBulmaLicenseIssue = (
  shipped: string,
  upstream: string,
  notices: string,
): string | undefined =>
  match({
    verbatim: isEqual(shipped, upstream),
    mit: isMitNotice(shipped),
    documented: includes(notices, trim(upstream)),
  })
    .with(
      { verbatim: false },
      () => `${BULMA_LICENSE} differs from node_modules/bulma/LICENSE`,
    )
    .with(
      { mit: false },
      () => `${BULMA_LICENSE} does not look like the MIT notice`,
    )
    .with(
      { documented: false },
      () => `${THIRD_PARTY_NOTICES} does not reproduce the Bulma notice`,
    )
    .otherwise(() => undefined);

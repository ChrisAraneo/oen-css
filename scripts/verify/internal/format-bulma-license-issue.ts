import { includes, isEqual, trim } from 'lodash-es';
import { match } from 'ts-pattern';
import {
  BULMA_LICENSE,
  THIRD_PARTY_NOTICES,
} from '../../common/dist/consts.ts';

const COPYRIGHT_PREFIX = 'Copyright (c)';

const PERMISSION_SENTENCE = 'Permission is hereby granted';

export const formatBulmaLicenseIssue = (
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

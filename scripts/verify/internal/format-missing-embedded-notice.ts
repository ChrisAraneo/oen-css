import { includes } from 'lodash-es';
import { match } from 'ts-pattern';
import type { LicenseComment } from '../../../src/banner/types/license-comment.ts';
import {
  OEN_MINIFIED_STYLESHEET,
  OEN_STYLESHEET,
  THIRD_PARTY_NOTICES,
} from '../../common/dist/consts.ts';

export const formatMissingEmbeddedNotice = (
  { text, name }: LicenseComment,
  minified: string,
  notices: string,
): string | undefined =>
  match({
    minified: includes(minified, text),
    documented: includes(notices, text),
  })
    .with(
      { minified: false },
      () =>
        `"${name}" is in ${OEN_STYLESHEET} but was minified out of ${OEN_MINIFIED_STYLESHEET}`,
    )
    .with(
      { documented: false },
      () => `"${name}" is not documented in ${THIRD_PARTY_NOTICES}`,
    )
    .otherwise(() => undefined);

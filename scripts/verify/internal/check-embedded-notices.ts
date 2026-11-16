import { compact, head, isEmpty, join, map } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { findEmbeddedLicenseComments } from '../../banner/find-embedded-license-comments.ts';
import type { LicenseComment } from '../../banner/types/license-comment.ts';
import { OEN_STYLESHEET } from '../../dist/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatMissingEmbeddedNotice } from './format-missing-embedded-notice.ts';

const CHECK_NAME = 'notices embedded by Bulma survive minification';

const formatEmbeddedNoticesProblem = (
  embedded: readonly LicenseComment[],
  minified: string,
  notices: string,
): string | undefined =>
  match(isEmpty(embedded))
    .with(
      true,
      () =>
        `expected at least the vendored minireset.css notice in ${OEN_STYLESHEET}. If Bulma ` +
        `really did drop it, remove this check deliberately`,
    )
    .otherwise(() =>
      head(
        compact(
          map(embedded, (comment) =>
            formatMissingEmbeddedNotice(comment, minified, notices),
          ),
        ),
      ),
    );

export const checkEmbeddedNotices = ({
  stylesheet,
  minifiedStylesheet,
  thirdPartyNotices,
}: VerifyInputs): CheckResult =>
  pipe(findEmbeddedLicenseComments(stylesheet.text), (embedded) => ({
    name: CHECK_NAME,
    detail: join(
      map(embedded, (comment) => comment.name),
      ', ',
    ),
    problem: formatEmbeddedNoticesProblem(
      embedded,
      minifiedStylesheet.text,
      thirdPartyNotices.text,
    ),
  }));

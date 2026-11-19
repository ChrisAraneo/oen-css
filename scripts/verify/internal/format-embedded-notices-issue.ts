import { compact, head, isEmpty, map } from 'lodash-es';
import { match } from 'ts-pattern';
import type { LicenseComment } from '../../../src/banner/types/license-comment.ts';
import { OEN_STYLESHEET } from '../../common/dist/consts.ts';
import { formatMissingEmbeddedNotice } from './format-missing-embedded-notice.ts';

export const formatEmbeddedNoticesIssue = (
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

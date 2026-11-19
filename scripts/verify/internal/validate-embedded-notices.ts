import { join, map } from 'lodash-es';
import { pipe } from 'remeda';
import { filterEmbeddedLicenseComments } from '../../../src/banner/filter-embedded-license-comments.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatEmbeddedNoticesIssue } from './format-embedded-notices-issue.ts';

const CHECK_NAME = 'notices embedded by Bulma survive minification';

export const validateEmbeddedNotices = ({
  stylesheet,
  minifiedStylesheet,
  thirdPartyNotices,
}: VerifyInputs): CheckResult =>
  pipe(filterEmbeddedLicenseComments(stylesheet.text), (embedded) => ({
    name: CHECK_NAME,
    detail: join(
      map(embedded, (comment) => comment.name),
      ', ',
    ),
    issue: formatEmbeddedNoticesIssue(
      embedded,
      minifiedStylesheet.text,
      thirdPartyNotices.text,
    ),
  }));

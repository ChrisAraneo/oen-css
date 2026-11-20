import { compact, head, join, map } from 'lodash-es';
import { pipe } from 'remeda';
import { BOTH_STYLESHEETS } from '../../common/package/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatLeftoverBulmaIssue } from './format-leftover-bulma-issue.ts';

const CHECK_NAME = 'no bulma identifiers leak outside the banner';

export const validateNoLeftoverBulma = ({
  stylesheet,
  minifiedStylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    [stylesheet, minifiedStylesheet],
    (files) => map(files, (file) => formatLeftoverBulmaIssue(file)),
    (issues) => ({
      name: CHECK_NAME,
      detail: join(BOTH_STYLESHEETS, ', '),
      issue: head(compact(issues)),
    }),
  );

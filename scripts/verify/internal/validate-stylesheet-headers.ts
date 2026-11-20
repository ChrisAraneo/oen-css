import { compact, head, join, map } from 'lodash-es';
import { pipe } from 'remeda';
import { BOTH_STYLESHEETS } from '../../common/package/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatStylesheetHeaderIssue } from './format-stylesheet-header-issue.ts';

const CHECK_NAME = 'stylesheets start with @charset and the attribution banner';

export const validateStylesheetHeaders = ({
  stylesheet,
  minifiedStylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    [stylesheet, minifiedStylesheet],
    (files) => map(files, (file) => formatStylesheetHeaderIssue(file)),
    (issues) => ({
      name: CHECK_NAME,
      detail: join(BOTH_STYLESHEETS, ', '),
      issue: head(compact(issues)),
    }),
  );

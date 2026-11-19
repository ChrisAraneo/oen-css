import { compact, head, join, map } from 'lodash-es';
import { pipe } from 'remeda';
import { BOTH_STYLESHEETS } from '../../common/dist/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatNamespaceLeakageIssue } from './format-namespace-leakage-issue.ts';

const CHECK_NAME = 'no bulma identifiers leak outside the banner';

export const validateNamespaceLeakage = ({
  stylesheet,
  minifiedStylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    [stylesheet, minifiedStylesheet],
    (files) => map(files, (file) => formatNamespaceLeakageIssue(file)),
    (issues) => ({
      name: CHECK_NAME,
      detail: join(BOTH_STYLESHEETS, ', '),
      issue: head(compact(issues)),
    }),
  );

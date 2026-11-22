import { compact, head, join, map } from 'lodash-es';
import { pipe } from 'remeda';
import { BOTH_RUNTIMES } from '../../common/package/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatRuntimeHeaderIssue } from './format-runtime-header-issue.ts';

const CHECK_NAME = 'runtimes start with the attribution banner';

export const validateRuntimeHeaders = ({
  runtime,
  minifiedRuntime,
}: VerifyInputs): CheckResult =>
  pipe(
    [runtime, minifiedRuntime],
    (files) => map(files, (file) => formatRuntimeHeaderIssue(file)),
    (issues) => ({
      name: CHECK_NAME,
      detail: join(BOTH_RUNTIMES, ', '),
      issue: head(compact(issues)),
    }),
  );

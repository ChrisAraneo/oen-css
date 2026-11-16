import { compact, head, join, map } from 'lodash-es';
import { pipe } from 'remeda';
import { BOTH_STYLESHEETS } from '../../dist/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { findStylesheetHeaderProblem } from './find-stylesheet-header-problem.ts';

const CHECK_NAME = 'stylesheets start with @charset and the attribution banner';

export const checkStylesheetHeaders = ({
  stylesheet,
  minifiedStylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    [stylesheet, minifiedStylesheet],
    (files) => map(files, (file) => findStylesheetHeaderProblem(file)),
    (problems) => ({
      name: CHECK_NAME,
      detail: join(BOTH_STYLESHEETS, ', '),
      problem: head(compact(problems)),
    }),
  );

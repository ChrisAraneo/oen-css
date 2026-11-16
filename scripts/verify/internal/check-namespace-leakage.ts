import { compact, head, join, map } from 'lodash-es';
import { pipe } from 'remeda';
import { BOTH_STYLESHEETS } from '../../dist/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { findNamespaceLeakageProblem } from './find-namespace-leakage-problem.ts';

const CHECK_NAME = 'no bulma identifiers leak outside the banner';

export const checkNamespaceLeakage = ({
  stylesheet,
  minifiedStylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    [stylesheet, minifiedStylesheet],
    (files) => map(files, (file) => findNamespaceLeakageProblem(file)),
    (problems) => ({
      name: CHECK_NAME,
      detail: join(BOTH_STYLESHEETS, ', '),
      problem: head(compact(problems)),
    }),
  );

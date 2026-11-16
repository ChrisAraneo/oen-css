import { size, uniq } from 'lodash-es';
import { pipe } from 'remeda';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatCustomPropertyProblem } from './format-custom-property-problem.ts';

const CHECK_NAME = 'custom properties are namespaced with --oen-';
const DECLARED_CUSTOM_PROPERTY = /--oen-[\w-]+(?=\s*:)/g;

export const checkCustomProperties = ({
  stylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    uniq(stylesheet.text.match(DECLARED_CUSTOM_PROPERTY) ?? []),
    (declared) => ({
      name: CHECK_NAME,
      detail: `${size(declared)} distinct properties`,
      problem: formatCustomPropertyProblem(declared),
    }),
  );

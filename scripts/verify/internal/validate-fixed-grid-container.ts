import { pipe } from 'remeda';
import { countMatches } from '../../../src/common/count-matches.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatFixedGridIssue } from './format-fixed-grid-issue.ts';

const CHECK_NAME = 'fixed grid container is namespaced';

const FIXED_GRID_CONTAINER_QUERY = /@container oen-fixed-grid/g;

export const validateFixedGridContainer = ({
  stylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    countMatches(stylesheet.text, FIXED_GRID_CONTAINER_QUERY),
    (queries) => ({
      name: CHECK_NAME,
      detail: `container-name + ${queries} @container queries`,
      issue: formatFixedGridIssue(stylesheet.text, queries),
    }),
  );

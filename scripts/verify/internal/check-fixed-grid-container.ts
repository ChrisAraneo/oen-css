import { includes } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { countMatches } from '../../common/count-matches.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';

const CHECK_NAME = 'fixed grid container is namespaced';
const FIXED_GRID_CONTAINER_DECLARATION = 'container-name: oen-fixed-grid';
const FIXED_GRID_CONTAINER_QUERY = /@container oen-fixed-grid/g;
const NO_CONTAINER_QUERIES = 0;

const formatFixedGridProblem = (
  css: string,
  queries: number,
): string | undefined =>
  match({ declared: includes(css, FIXED_GRID_CONTAINER_DECLARATION), queries })
    .with(
      { declared: false },
      () => `expected \`${FIXED_GRID_CONTAINER_DECLARATION}\``,
    )
    .with(
      { queries: NO_CONTAINER_QUERIES },
      () => 'expected @container queries against oen-fixed-grid',
    )
    .otherwise(() => undefined);

export const checkFixedGridContainer = ({
  stylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    countMatches(stylesheet.text, FIXED_GRID_CONTAINER_QUERY),
    (queries) => ({
      name: CHECK_NAME,
      detail: `container-name + ${queries} @container queries`,
      problem: formatFixedGridProblem(stylesheet.text, queries),
    }),
  );

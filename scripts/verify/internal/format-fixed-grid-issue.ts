import { includes } from 'lodash-es';
import { match } from 'ts-pattern';

const FIXED_GRID_CONTAINER_DECLARATION = 'container-name: oen-fixed-grid';

const NO_CONTAINER_QUERIES = 0;

export const formatFixedGridIssue = (
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

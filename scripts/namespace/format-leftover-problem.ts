import { isEmpty, join, size, take } from 'lodash-es';
import { match } from 'ts-pattern';
import { MAX_REPORTED_LEFTOVERS } from './internal/consts.ts';

const formatOmittedLeftovers = (leftovers: readonly string[]): string =>
  match(size(leftovers) > MAX_REPORTED_LEFTOVERS)
    .with(
      true,
      () => `\n  ... and ${size(leftovers) - MAX_REPORTED_LEFTOVERS} more`,
    )
    .otherwise(() => '');

export const formatLeftoverProblem = (
  leftovers: readonly string[],
  fileName: string,
): string | undefined =>
  match(isEmpty(leftovers))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `Found ${size(leftovers)} "bulma" identifier(s) outside the attribution banner in ${fileName}. ` +
        `Each one needs a NamespaceMapping in scripts/namespace/consts.ts; a blanket search and replace ` +
        `would also rewrite the attribution banner and the upstream URLs it points at.\n` +
        `${join(take(leftovers, MAX_REPORTED_LEFTOVERS), '\n')}${formatOmittedLeftovers(leftovers)}`,
    );

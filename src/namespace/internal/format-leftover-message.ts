import { join, size, take } from 'lodash-es';
import { MAX_REPORTED_LEFTOVERS } from './consts.ts';
import { formatOmittedLeftovers } from './format-omitted-leftovers.ts';

export const formatLeftoverMessage = (
  leftovers: readonly string[],
  fileName: string,
): string =>
  `Found ${size(leftovers)} "bulma" identifier(s) outside the attribution banner in ${fileName}. ` +
  `Each one needs a NamespaceMapping in src/namespace/consts.ts; a blanket search and replace ` +
  `would also rewrite the attribution banner and the upstream URLs it points at.\n` +
  `${join(take(leftovers, MAX_REPORTED_LEFTOVERS), '\n')}${formatOmittedLeftovers(leftovers)}`;

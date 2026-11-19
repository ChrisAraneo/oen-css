import { size } from 'lodash-es';
import { match } from 'ts-pattern';
import { MAX_REPORTED_LEFTOVERS } from './consts.ts';

export const formatOmittedLeftovers = (leftovers: readonly string[]): string =>
  match(size(leftovers) > MAX_REPORTED_LEFTOVERS)
    .with(
      true,
      () => `\n  ... and ${size(leftovers) - MAX_REPORTED_LEFTOVERS} more`,
    )
    .otherwise(() => '');

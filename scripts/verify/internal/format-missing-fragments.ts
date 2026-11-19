import { isEmpty, join, map } from 'lodash-es';
import { match } from 'ts-pattern';

export const formatMissingFragments = (
  fileName: string,
  missing: readonly string[],
): string | undefined =>
  match(isEmpty(missing))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `${fileName} banner is missing ${join(
          map(missing, (fragment) => `"${fragment}"`),
          ', ',
        )}`,
    );

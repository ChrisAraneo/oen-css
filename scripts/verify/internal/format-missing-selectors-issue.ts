import { isEmpty, join } from 'lodash-es';
import { match } from 'ts-pattern';

export const formatMissingSelectorsIssue = (
  missing: readonly string[],
): string | undefined =>
  match(isEmpty(missing))
    .with(true, () => undefined)
    .otherwise(() => `missing selectors: ${join(missing, ', ')}`);

import { isEmpty } from 'lodash-es';
import { match } from 'ts-pattern';
import { formatLeftoverMessage } from './internal/format-leftover-message.ts';

export const formatLeftoverIssue = (
  leftovers: readonly string[],
  fileName: string,
): string | undefined =>
  match(isEmpty(leftovers))
    .with(true, () => undefined)
    .otherwise(() => formatLeftoverMessage(leftovers, fileName));

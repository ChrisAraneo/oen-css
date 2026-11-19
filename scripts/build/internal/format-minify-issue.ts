import { isEmpty, join } from 'lodash-es';
import { match } from 'ts-pattern';

export const formatMinifyIssue = (
  errors: readonly string[],
  fileName: string,
): string | undefined =>
  match(isEmpty(errors))
    .with(true, () => undefined)
    .otherwise(() => `clean-css failed on ${fileName}:\n${join(errors, '\n')}`);

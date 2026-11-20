import { isEmpty, join } from 'lodash-es';
import { match } from 'ts-pattern';

export const formatMissingPackageFilesIssue = (
  missing: readonly string[],
): string | undefined =>
  match(isEmpty(missing))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `missing from the package root: ${join(missing, ', ')}. Run \`npm run build\``,
    );

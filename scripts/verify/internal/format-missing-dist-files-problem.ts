import { isEmpty, join } from 'lodash-es';
import { match } from 'ts-pattern';

export const formatMissingDistFilesProblem = (
  missing: readonly string[],
): string | undefined =>
  match(isEmpty(missing))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `missing from dist/: ${join(missing, ', ')}. Run \`npm run build:css\``,
    );

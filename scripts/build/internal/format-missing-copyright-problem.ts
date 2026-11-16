import { P, match } from 'ts-pattern';

const { nullish } = P;

export const formatMissingCopyrightProblem = (
  copyrightLine: string | undefined,
): string | undefined =>
  match(copyrightLine)
    .with(
      nullish,
      () => 'Could not find a "Copyright (c)" line in the license text.',
    )
    .otherwise(() => undefined);

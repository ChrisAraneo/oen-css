import { isEmpty, join, map } from 'lodash-es';
import { match } from 'ts-pattern';
import { OEN_STYLESHEET } from '../../dist/consts.ts';

const formatExpectedDeclarations = (missing: readonly string[]): string =>
  join(
    map(missing, (declaration) => `  expected: ${declaration}`),
    '\n',
  );

export const formatMissingDeclarationsProblem = (
  missing: readonly string[],
): string | undefined =>
  match(isEmpty(missing))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `dist/${OEN_STYLESHEET} does not carry the theme declared in scripts/theme/consts.ts. ` +
        `The values src/oen.scss passes to Bulma have to match it.\n${formatExpectedDeclarations(missing)}`,
    );

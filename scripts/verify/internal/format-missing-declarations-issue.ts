import { isEmpty } from 'lodash-es';
import { match } from 'ts-pattern';
import { OEN_STYLESHEET } from '../../common/dist/consts.ts';
import { formatExpectedDeclarations } from './format-expected-declarations.ts';

export const formatMissingDeclarationsIssue = (
  missing: readonly string[],
): string | undefined =>
  match(isEmpty(missing))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `dist/${OEN_STYLESHEET} does not carry the theme declared in src/colors/, src/fonts/ and ` +
        `src/typography/. The values src/stylesheet/ passes to Bulma have to match it.\n${formatExpectedDeclarations(missing)}`,
    );

import { isEmpty, join } from 'lodash-es';
import { match } from 'ts-pattern';
import { OEN_STYLESHEET } from '../../common/dist/consts.ts';
import { formatFirstDifferences } from './format-first-differences.ts';
import type { StylesheetDifference } from './types/stylesheet-difference.ts';

export const formatEquivalenceIssue = (
  unthemed: readonly StylesheetDifference[],
): string | undefined =>
  match(isEmpty(unthemed))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `dist/${OEN_STYLESHEET} differs from Bulma outside the Oen theme. Either a NamespaceMapping in ` +
        `src/namespace/consts.ts is too broad, or src/stylesheet/ now configures something beyond the colors ` +
        `in src/colors/, the stack in src/fonts/ and the scale in src/typography/. In that case this check ` +
        `needs to be relaxed ` +
        `deliberately.\n${join(formatFirstDifferences(unthemed), '\n')}`,
    );

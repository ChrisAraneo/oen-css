import { size } from 'lodash-es';
import { match } from 'ts-pattern';
import { countMatches } from '../../../src/common/count-matches.ts';
import {
  OEN_MINIFIED_STYLESHEET,
  OEN_STYLESHEET,
} from '../../common/dist/consts.ts';

const OPENING_BRACE = /\{/g;
const CLOSING_BRACE = /\}/g;

export const formatMinifiedStylesheetIssue = (
  expanded: string,
  minified: string,
): string | undefined =>
  match({
    smaller: size(minified) < size(expanded),
    balanced:
      countMatches(minified, OPENING_BRACE) ===
      countMatches(minified, CLOSING_BRACE),
  })
    .with(
      { smaller: false },
      () => `${OEN_MINIFIED_STYLESHEET} is not smaller than ${OEN_STYLESHEET}`,
    )
    .with(
      { balanced: false },
      () => `${OEN_MINIFIED_STYLESHEET} has unbalanced braces`,
    )
    .otherwise(() => undefined);

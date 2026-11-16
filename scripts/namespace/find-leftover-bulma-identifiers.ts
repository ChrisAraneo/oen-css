import { filter, map, split, trim } from 'lodash-es';
import { pipe } from 'remeda';
import { toBlankedStylesheetHeader } from '../banner/to-blanked-stylesheet-header.ts';
import { BULMA_IDENTIFIER } from './internal/consts.ts';

const FIRST_LINE_NUMBER = 1;

export const findLeftoverBulmaIdentifiers = (
  css: string,
  fileName: string,
): readonly string[] =>
  pipe(
    split(toBlankedStylesheetHeader(css), '\n'),
    (lines) =>
      map(lines, (line, index) => ({
        line: trim(line),
        number: index + FIRST_LINE_NUMBER,
      })),
    (lines) => filter(lines, ({ line }) => BULMA_IDENTIFIER.test(line)),
    (lines) =>
      map(lines, ({ line, number }) => `  ${fileName}:${number}: ${line}`),
  );

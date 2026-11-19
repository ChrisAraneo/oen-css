import { pipe } from 'remeda';
import { filterLeftoverIdentifierLines } from './internal/filter-leftover-identifier-lines.ts';
import { formatLeftoverLines } from './internal/format-leftover-lines.ts';
import { splitLeftoverLines } from './internal/split-leftover-lines.ts';

export const filterLeftoverBulmaIdentifiers = (
  css: string,
  fileName: string,
): readonly string[] =>
  pipe(
    { css, fileName },
    splitLeftoverLines,
    filterLeftoverIdentifierLines,
    formatLeftoverLines,
  );

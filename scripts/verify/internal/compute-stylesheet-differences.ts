import { filter, isEqual, size, split, times } from 'lodash-es';
import { pipe } from 'remeda';
import type { StylesheetDifference } from './types/stylesheet-difference.ts';

const FIRST_LINE_NUMBER = 1;

export const computeStylesheetDifferences = (
  ours: string,
  theirs: string,
): readonly StylesheetDifference[] =>
  pipe(
    { ourLines: split(ours, '\n'), theirLines: split(theirs, '\n') },
    ({ ourLines, theirLines }) =>
      times(Math.max(size(ourLines), size(theirLines)), (index) => ({
        lineNumber: index + FIRST_LINE_NUMBER,
        ours: ourLines[index],
        theirs: theirLines[index],
      })),
    (lines) => filter(lines, (line) => !isEqual(line.ours, line.theirs)),
  );

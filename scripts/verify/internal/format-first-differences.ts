import { map, take } from 'lodash-es';
import type { StylesheetDifference } from './types/stylesheet-difference.ts';

const MAX_REPORTED_DIFFERENCES = 5;

const END_OF_FILE = '<eof>';

export const formatFirstDifferences = (
  differences: readonly StylesheetDifference[],
): readonly string[] =>
  map(
    take(differences, MAX_REPORTED_DIFFERENCES),
    ({ lineNumber, ours, theirs }) =>
      `  line ${lineNumber}:\n    oen: ${ours ?? END_OF_FILE}\n    bulma: ${theirs ?? END_OF_FILE}`,
  );

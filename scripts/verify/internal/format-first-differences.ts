import { filter, isEqual, map, size, split, take, times } from 'lodash-es';
import { pipe } from 'remeda';

const MAX_REPORTED_DIFFERENCES = 5;
const FIRST_LINE_NUMBER = 1;
const END_OF_FILE = '<eof>';

export const formatFirstDifferences = (
  ours: string,
  theirs: string,
): readonly string[] =>
  pipe(
    { ourLines: split(ours, '\n'), theirLines: split(theirs, '\n') },
    ({ ourLines, theirLines }) =>
      times(Math.max(size(ourLines), size(theirLines)), (index) => ({
        index,
        ours: ourLines[index],
        theirs: theirLines[index],
      })),
    (lines) => filter(lines, (line) => !isEqual(line.ours, line.theirs)),
    (differences) => take(differences, MAX_REPORTED_DIFFERENCES),
    (differences) =>
      map(
        differences,
        ({ index, ours, theirs }) =>
          `  line ${index + FIRST_LINE_NUMBER}:\n    oen: ${ours ?? END_OF_FILE}\n    bulma: ${theirs ?? END_OF_FILE}`,
      ),
  );

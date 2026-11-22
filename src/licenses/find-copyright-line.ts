import { filter, head, map, split, startsWith, trim } from 'lodash-es';
import { pipe } from 'remeda';

export const findCopyrightLine = (
  license: string,
  prefix: string,
): string | undefined =>
  pipe(
    split(license, '\n'),
    (lines) => filter(lines, (line) => startsWith(line, prefix)),
    (lines) => map(lines, (line) => trim(line)),
    head<string>,
  );

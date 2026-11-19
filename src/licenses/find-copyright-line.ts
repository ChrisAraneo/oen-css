import { filter, head, map, split, startsWith, trim } from 'lodash-es';
import { pipe } from 'remeda';

const COPYRIGHT_PREFIX = 'Copyright (c)';

export const findCopyrightLine = (license: string): string | undefined =>
  pipe(
    split(license, '\n'),
    (lines) => filter(lines, (line) => startsWith(line, COPYRIGHT_PREFIX)),
    (lines) => map(lines, (line) => trim(line)),
    head<string>,
  );

import { filter, head, map, split, startsWith, trim } from 'lodash-es';
import { pipe } from 'remeda';
import { COPYRIGHT_PREFIX } from './internal/consts.ts';

export const findCopyrightLine = (license: string): string | undefined =>
  pipe(
    split(license, '\n'),
    (lines) => filter(lines, (line) => startsWith(line, COPYRIGHT_PREFIX)),
    (lines) => map(lines, (line) => trim(line)),
    (lines) => head(lines),
  );

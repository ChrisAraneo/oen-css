import { join, map } from 'lodash-es';
import { relative } from 'node:path';
import { writeLines } from '../../common/write-lines.ts';
import { REPOSITORY_ROOT } from '../../consts.ts';

export const writeCleanReport = (directories: readonly string[]): void =>
  writeLines([
    `Removed: ${join(
      map(directories, (directory) => relative(REPOSITORY_ROOT, directory)),
      ', ',
    )}`,
  ]);

import { join, map } from 'lodash-es';
import { relative } from 'node:path';
import { REPOSITORY_ROOT } from '../../common/consts.ts';

export const formatRemovedDirectories = (
  directories: readonly string[],
): string =>
  join(
    map(directories, (directory) => relative(REPOSITORY_ROOT, directory)),
    ', ',
  );

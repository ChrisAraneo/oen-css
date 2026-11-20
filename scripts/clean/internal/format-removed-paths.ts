import { join, map } from 'lodash-es';
import { relative } from 'node:path';
import { REPOSITORY_ROOT } from '../../common/consts.ts';

export const formatRemovedPaths = (paths: readonly string[]): string =>
  join(
    map(paths, (path) => relative(REPOSITORY_ROOT, path)),
    ', ',
  );

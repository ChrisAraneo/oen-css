import { writeLines } from '../../common/write-lines.ts';
import { formatRemovedPaths } from './format-removed-paths.ts';

export const writeCleanReport = (paths: readonly string[]): void =>
  writeLines([`Removed: ${formatRemovedPaths(paths)}`]);

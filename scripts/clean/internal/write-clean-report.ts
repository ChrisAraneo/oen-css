import { writeLines } from '../../common/write-lines.ts';
import { formatRemovedDirectories } from './format-removed-directories.ts';

export const writeCleanReport = (directories: readonly string[]): void =>
  writeLines([`Removed: ${formatRemovedDirectories(directories)}`]);

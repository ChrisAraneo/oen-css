import { map } from 'lodash-es';
import { basename } from 'node:path';
import type { TextFile } from '../../common/types/text-file.ts';

export const toDistFileNames = (
  files: readonly TextFile[],
): readonly string[] => map(files, (file) => basename(file.path));

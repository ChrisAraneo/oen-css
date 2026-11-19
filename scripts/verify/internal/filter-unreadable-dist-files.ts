import { filter, isString } from 'lodash-es';
import type { TextFile } from '../../common/types/text-file.ts';

export const filterUnreadableDistFiles = (
  files: readonly TextFile[],
): readonly TextFile[] => filter(files, (file) => isString(file.issue));

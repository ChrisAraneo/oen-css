import { BLANK_LINE } from '../../common/consts.ts';
import { writeLines } from '../../common/write-lines.ts';

export const writeRebuildNotice = (): void =>
  writeLines([BLANK_LINE, 'Change detected, rebuilding...']);

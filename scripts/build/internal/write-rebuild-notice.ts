import { writeLines } from '../../common/write-lines.ts';

const BLANK_LINE = '';

export const writeRebuildNotice = (): void =>
  writeLines([BLANK_LINE, 'Change detected, rebuilding...']);

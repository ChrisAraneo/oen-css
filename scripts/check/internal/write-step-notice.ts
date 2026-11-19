import { BLANK_LINE } from '../../common/consts.ts';
import { writeLines } from '../../common/write-lines.ts';

export const writeStepNotice = (name: string): void =>
  writeLines([BLANK_LINE, `> ${name}`]);

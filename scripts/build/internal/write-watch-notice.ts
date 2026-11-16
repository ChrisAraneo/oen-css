import { writeLines } from '../../common/write-lines.ts';
import { SRC_DIRECTORY } from '../../consts.ts';

const BLANK_LINE = '';

export const writeWatchNotice = (): void =>
  writeLines([
    BLANK_LINE,
    `Watching ${SRC_DIRECTORY} for changes. Press Ctrl+C to stop.`,
  ]);

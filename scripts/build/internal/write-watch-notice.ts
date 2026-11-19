import { BLANK_LINE, SRC_DIRECTORY } from '../../common/consts.ts';
import { writeLines } from '../../common/write-lines.ts';

export const writeWatchNotice = (): void =>
  writeLines([
    BLANK_LINE,
    `Watching ${SRC_DIRECTORY} for changes. Press Ctrl+C to stop.`,
  ]);

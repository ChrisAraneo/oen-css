import { describe, expect, it, vi } from 'vitest';
import { SRC_DIRECTORY } from '../../common/consts.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeWatchNotice } from './write-watch-notice.ts';

vi.mock('../../common/write-lines.ts', () => ({ writeLines: vi.fn() }));

describe('writeWatchNotice', () => {
  it('should pass the watched directory and how to stop to `writeLines` when the notice is written', () => {
    writeWatchNotice();

    expect(writeLines).toHaveBeenCalledWith([
      '',
      `Watching ${SRC_DIRECTORY} for changes. Press Ctrl+C to stop.`,
    ]);
  });

  it('should pass a line naming the source directory to `writeLines` when the notice is written', () => {
    writeWatchNotice();

    expect(writeLines).toHaveBeenCalledWith(
      expect.arrayContaining([expect.stringContaining(SRC_DIRECTORY)]),
    );
  });

  it('should call `writeLines` once when the notice is written', () => {
    writeWatchNotice();

    expect(writeLines).toHaveBeenCalledTimes(1);
  });
});

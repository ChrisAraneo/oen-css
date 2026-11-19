import { describe, expect, it, vi } from 'vitest';
import { writeLines } from '../../common/write-lines.ts';
import { writeRebuildNotice } from './write-rebuild-notice.ts';

vi.mock('../../common/write-lines.ts', () => ({ writeLines: vi.fn() }));

describe('writeRebuildNotice', () => {
  it('should pass the rebuild notice to `writeLines` when the notice is written', () => {
    writeRebuildNotice();

    expect(writeLines).toHaveBeenCalledWith([
      '',
      'Change detected, rebuilding...',
    ]);
  });

  it('should pass a blank line to `writeLines` when the notice is written', () => {
    writeRebuildNotice();

    expect(writeLines).toHaveBeenCalledWith(expect.arrayContaining(['']));
  });

  it('should call `writeLines` once when the notice is written', () => {
    writeRebuildNotice();

    expect(writeLines).toHaveBeenCalledTimes(1);
  });
});

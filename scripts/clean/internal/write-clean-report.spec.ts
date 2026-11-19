import { describe, expect, it, vi } from 'vitest';
import { DIST_DIRECTORY } from '../../common/consts.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeCleanReport } from './write-clean-report.ts';

vi.mock('../../common/write-lines.ts', () => ({ writeLines: vi.fn() }));

describe('writeCleanReport', () => {
  it('should pass `Removed: dist` to `writeLines` when one directory was removed', () => {
    writeCleanReport([DIST_DIRECTORY]);

    expect(writeLines).toHaveBeenCalledWith(['Removed: dist']);
  });

  it('should pass both directories on one line to `writeLines` when two were removed', () => {
    writeCleanReport([DIST_DIRECTORY, DIST_DIRECTORY]);

    expect(writeLines).toHaveBeenCalledWith(['Removed: dist, dist']);
  });

  it('should pass `Removed: ` to `writeLines` when nothing was removed', () => {
    writeCleanReport([]);

    expect(writeLines).toHaveBeenCalledWith(['Removed: ']);
  });

  it('should call `writeLines` once when the report is written', () => {
    writeCleanReport([DIST_DIRECTORY]);

    expect(writeLines).toHaveBeenCalledTimes(1);
  });
});

import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { REPOSITORY_ROOT } from '../../common/consts.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeCleanReport } from './write-clean-report.ts';

vi.mock('../../common/write-lines.ts', () => ({ writeLines: vi.fn() }));

const STYLESHEET = resolve(REPOSITORY_ROOT, 'oen.css');

describe('writeCleanReport', () => {
  it('should pass `Removed: oen.css` to `writeLines` when one path was removed', () => {
    writeCleanReport([STYLESHEET]);

    expect(writeLines).toHaveBeenCalledWith(['Removed: oen.css']);
  });

  it('should pass both paths on one line to `writeLines` when two were removed', () => {
    writeCleanReport([STYLESHEET, STYLESHEET]);

    expect(writeLines).toHaveBeenCalledWith(['Removed: oen.css, oen.css']);
  });

  it('should pass `Removed: ` to `writeLines` when nothing was removed', () => {
    writeCleanReport([]);

    expect(writeLines).toHaveBeenCalledWith(['Removed: ']);
  });

  it('should call `writeLines` once when the report is written', () => {
    writeCleanReport([STYLESHEET]);

    expect(writeLines).toHaveBeenCalledTimes(1);
  });
});

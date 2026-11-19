import { describe, expect, it, vi } from 'vitest';
import { writeIssueLines } from '../../common/write-issue-lines.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeCheckReport } from './write-check-report.ts';

vi.mock('../../common/write-lines.ts', () => ({ writeLines: vi.fn() }));
vi.mock('../../common/write-issue-lines.ts', () => ({
  writeIssueLines: vi.fn(),
}));

describe('writeCheckReport', () => {
  it('should return `true` when every step passed', () => {
    expect(writeCheckReport([{ name: 'format', succeeded: true }], 1)).toBe(
      true,
    );
  });

  it('should return `false` when a step failed', () => {
    expect(writeCheckReport([{ name: 'format', succeeded: false }], 1)).toBe(
      false,
    );
  });

  it('should pass `1/6 steps passed` to `writeLines` when one step of six passed', () => {
    writeCheckReport([{ name: 'format', succeeded: true }], 6);

    expect(writeLines).toHaveBeenCalledWith(['', '1/6 steps passed']);
  });

  it('should pass the failed step to `writeIssueLines` when a step failed', () => {
    writeCheckReport(
      [
        { name: 'format', succeeded: true },
        { name: 'typecheck', succeeded: false },
      ],
      6,
    );

    expect(writeIssueLines).toHaveBeenCalledWith(['failed: typecheck']);
  });

  it('should pass an empty array to `writeIssueLines` when every step passed', () => {
    writeCheckReport([{ name: 'format', succeeded: true }], 1);

    expect(writeIssueLines).toHaveBeenCalledWith([]);
  });

  it('should pass `0/2 steps passed` to `writeLines` when a step failed', () => {
    writeCheckReport([{ name: 'format', succeeded: false }], 2);

    expect(writeLines).toHaveBeenCalledWith(['', '0/2 steps passed']);
  });

  it('should return `true` when no step ran', () => {
    expect(writeCheckReport([], 0)).toBe(true);
  });
});

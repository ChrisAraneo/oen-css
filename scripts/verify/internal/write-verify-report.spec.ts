import { describe, expect, it, vi } from 'vitest';
import { writeIssueLines } from '../../common/write-issue-lines.ts';
import { writeLines } from '../../common/write-lines.ts';
import { writeVerifyReport } from './write-verify-report.ts';

vi.mock('../../common/write-lines.ts', () => ({ writeLines: vi.fn() }));
vi.mock('../../common/write-issue-lines.ts', () => ({
  writeIssueLines: vi.fn(),
}));

describe('writeVerifyReport', () => {
  it('should return `true` when every check passed', () => {
    expect(
      writeVerifyReport([{ name: 'a', detail: 'x', issue: undefined }]),
    ).toBe(true);
  });

  it('should return `false` when a check failed', () => {
    expect(
      writeVerifyReport([{ name: 'a', detail: 'x', issue: 'broke' }]),
    ).toBe(false);
  });

  it('should pass the passed check and its detail to `writeLines` when the check passed', () => {
    writeVerifyReport([{ name: 'a', detail: 'x', issue: undefined }]);

    expect(writeLines).toHaveBeenCalledWith(['  ok    a: x']);
  });

  it('should pass the failed check to `writeIssueLines` when the check failed', () => {
    writeVerifyReport([{ name: 'a', detail: 'x', issue: 'broke' }]);

    expect(writeIssueLines).toHaveBeenCalledWith(['  FAIL  a\n        broke']);
  });

  it('should pass the tally to `writeLines` last when the report is written', () => {
    writeVerifyReport([
      { name: 'a', detail: 'x', issue: undefined },
      { name: 'b', detail: 'y', issue: 'broke' },
    ]);

    expect(writeLines).toHaveBeenLastCalledWith(['', '1/2 checks passed']);
  });

  it('should return `true` when there were no checks', () => {
    expect(writeVerifyReport([])).toBe(true);
  });
});

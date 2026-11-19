import { describe, expect, it, vi } from 'vitest';
import { writeIssueLines } from './write-issue-lines.ts';

describe('writeIssueLines', () => {
  it('should pass the issues joined by a newline to `console.error` when called with two', () => {
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    writeIssueLines(['first', 'second']);

    expect(error).toHaveBeenCalledWith('first\nsecond');
  });

  it('should not call `console.error` when called with no issue', () => {
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    writeIssueLines([]);

    expect(error).not.toHaveBeenCalled();
  });

  it('should not call `console.log` when called with an issue', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    writeIssueLines(['an issue']);

    expect(log).not.toHaveBeenCalled();
  });

  it('should call `console.error` once when called with two issues', () => {
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    writeIssueLines(['a', 'b']);

    expect(error).toHaveBeenCalledTimes(1);
  });
});

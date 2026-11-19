import { describe, expect, it, vi } from 'vitest';
import { writeLines } from './write-lines.ts';

describe('writeLines', () => {
  it('should pass the lines joined by a newline to `console.log` when called with two', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    writeLines(['first', 'second']);

    expect(log).toHaveBeenCalledWith('first\nsecond');
  });

  it('should not call `console.log` when called with no line', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    writeLines([]);

    expect(log).not.toHaveBeenCalled();
  });

  it('should pass the line alone to `console.log` when called with one', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    writeLines(['only']);

    expect(log).toHaveBeenCalledWith('only');
  });

  it('should call `console.log` once when called with three lines', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    writeLines(['a', 'b', 'c']);

    expect(log).toHaveBeenCalledTimes(1);
  });

  it('should pass the blank line to `console.log` when the first line is blank', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    writeLines(['', 'after a blank']);

    expect(log).toHaveBeenCalledWith('\nafter a blank');
  });
});

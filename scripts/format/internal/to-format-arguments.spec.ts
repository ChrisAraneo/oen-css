import { describe, expect, it } from 'vitest';
import { CHECK_ARGUMENTS, WRITE_ARGUMENTS } from '../consts.ts';
import { toFormatArguments } from './to-format-arguments.ts';

describe('toFormatArguments', () => {
  it('should return the check arguments when called with `true`', () => {
    expect(toFormatArguments(true)).toEqual(CHECK_ARGUMENTS);
  });

  it('should return the write arguments when called with `false`', () => {
    expect(toFormatArguments(false)).toEqual(WRITE_ARGUMENTS);
  });

  it('should return arguments containing `--check` when called with `true`', () => {
    expect(toFormatArguments(true)).toContain('--check');
  });

  it('should return arguments containing `--write` when called with `false`', () => {
    expect(toFormatArguments(false)).toContain('--write');
  });

  it('should return arguments containing `.` when called with `true` or `false`', () => {
    expect(toFormatArguments(true)).toContain('.');
    expect(toFormatArguments(false)).toContain('.');
  });
});

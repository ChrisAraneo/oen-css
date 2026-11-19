import { describe, expect, it, vi } from 'vitest';
import { writeLines } from '../../common/write-lines.ts';
import { writeStepNotice } from './write-step-notice.ts';

vi.mock('../../common/write-lines.ts', () => ({ writeLines: vi.fn() }));

describe('writeStepNotice', () => {
  it('should pass a blank line and `> typecheck` to `writeLines` when the notice is written', () => {
    writeStepNotice('typecheck');

    expect(writeLines).toHaveBeenCalledWith(['', '> typecheck']);
  });

  it('should pass the step name prefixed with `>` to `writeLines` when the notice is written', () => {
    writeStepNotice('build');

    expect(writeLines).toHaveBeenCalledWith(
      expect.arrayContaining(['> build']),
    );
  });

  it('should pass a blank line to `writeLines` when the notice is written', () => {
    writeStepNotice('verify');

    expect(writeLines).toHaveBeenCalledWith(expect.arrayContaining(['']));
  });

  it('should call `writeLines` once when the notice is written', () => {
    writeStepNotice('format');

    expect(writeLines).toHaveBeenCalledTimes(1);
  });
});

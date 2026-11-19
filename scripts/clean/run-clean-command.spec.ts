import { rm } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { GENERATED_DIRECTORIES } from './consts.ts';
import { writeCleanReport } from './internal/write-clean-report.ts';
import { runCleanCommand } from './run-clean-command.ts';

vi.mock('node:fs/promises', () => ({ rm: vi.fn() }));
vi.mock('./internal/write-clean-report.ts', () => ({
  writeCleanReport: vi.fn(),
}));

describe('runCleanCommand', () => {
  it('should call `rm` once per generated directory when the command runs', async () => {
    await runCleanCommand();

    expect(rm).toHaveBeenCalledTimes(GENERATED_DIRECTORIES.length);
  });

  it('should call `rm` with `recursive` and `force` when the command runs', async () => {
    await runCleanCommand();

    expect(rm).toHaveBeenCalledWith(GENERATED_DIRECTORIES.at(0), {
      recursive: true,
      force: true,
    });
  });

  it('should pass the generated directories to `writeCleanReport` when the command runs', async () => {
    await runCleanCommand();

    expect(writeCleanReport).toHaveBeenCalledWith(GENERATED_DIRECTORIES);
  });

  it('should call `writeCleanReport` after every removal when the command runs', async () => {
    const order: string[] = [];
    vi.mocked(rm).mockImplementation(() => {
      order.push('rm');

      return Promise.resolve();
    });
    vi.mocked(writeCleanReport).mockImplementation(() => {
      order.push('report');
    });

    await runCleanCommand();

    expect(order.at(-1)).toBe('report');
  });

  it('should reject with the removal error when a directory cannot be removed', async () => {
    vi.mocked(rm).mockRejectedValue(new Error('EBUSY'));

    await expect(runCleanCommand()).rejects.toThrow('EBUSY');
  });
});

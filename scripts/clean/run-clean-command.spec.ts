import { rm } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { GENERATED_PATHS } from './consts.ts';
import { writeCleanReport } from './internal/write-clean-report.ts';
import { runCleanCommand } from './run-clean-command.ts';

vi.mock('node:fs/promises', () => ({ rm: vi.fn() }));
vi.mock('./internal/write-clean-report.ts', () => ({
  writeCleanReport: vi.fn(),
}));

describe('runCleanCommand', () => {
  it('should call `rm` once per generated path when the command runs', async () => {
    await runCleanCommand();

    expect(rm).toHaveBeenCalledTimes(GENERATED_PATHS.length);
  });

  it('should call `rm` with `recursive` and `force` when the command runs', async () => {
    await runCleanCommand();

    expect(rm).toHaveBeenCalledWith(GENERATED_PATHS.at(0), {
      recursive: true,
      force: true,
    });
  });

  it('should pass the generated paths to `writeCleanReport` when the command runs', async () => {
    await runCleanCommand();

    expect(writeCleanReport).toHaveBeenCalledWith(GENERATED_PATHS);
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

  it('should reject with the removal error when a path cannot be removed', async () => {
    vi.mocked(rm).mockRejectedValue(new Error('EBUSY'));

    await expect(runCleanCommand()).rejects.toThrow('EBUSY');
  });
});

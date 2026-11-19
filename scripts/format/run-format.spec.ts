import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runProcess } from '../common/run-process.ts';
import { CHECK_ARGUMENTS, PRETTIER_CLI, WRITE_ARGUMENTS } from './consts.ts';
import { runFormat } from './run-format.ts';

vi.mock('../common/run-process.ts', () => ({ runProcess: vi.fn() }));

describe('runFormat', () => {
  beforeEach(() => {
    vi.mocked(runProcess).mockResolvedValue(true);
  });

  it('should call `runProcess` with the Prettier CLI and the check arguments when called with `true`', async () => {
    await runFormat(true);

    expect(runProcess).toHaveBeenCalledWith(PRETTIER_CLI, CHECK_ARGUMENTS);
  });

  it('should call `runProcess` with the Prettier CLI and the write arguments when called with `false`', async () => {
    await runFormat(false);

    expect(runProcess).toHaveBeenCalledWith(PRETTIER_CLI, WRITE_ARGUMENTS);
  });

  it('should resolve with `true` when Prettier succeeds', async () => {
    await expect(runFormat(true)).resolves.toBe(true);
  });

  it('should resolve with `false` when Prettier reports an unformatted file', async () => {
    vi.mocked(runProcess).mockResolvedValue(false);

    await expect(runFormat(true)).resolves.toBe(false);
  });

  it('should call `runProcess` once when Prettier runs', async () => {
    await runFormat(false);

    expect(runProcess).toHaveBeenCalledTimes(1);
  });
});

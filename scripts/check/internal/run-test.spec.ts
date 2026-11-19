import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runProcess } from '../../common/run-process.ts';
import { TEST_ARGUMENTS, VITEST_CLI } from '../consts.ts';
import { runTest } from './run-test.ts';

vi.mock('../../common/run-process.ts', () => ({ runProcess: vi.fn() }));

describe('runTest', () => {
  beforeEach(() => {
    vi.mocked(runProcess).mockResolvedValue(true);
  });

  it('should call `runProcess` with the vitest CLI and the test arguments when the tests run', async () => {
    await runTest();

    expect(runProcess).toHaveBeenCalledWith(VITEST_CLI, TEST_ARGUMENTS);
  });

  it('should call `runProcess` with `run` as the only argument when the tests run', async () => {
    await runTest();

    expect(runProcess).toHaveBeenCalledWith(expect.any(String), ['run']);
  });

  it('should resolve with `true` when vitest succeeds', async () => {
    await expect(runTest()).resolves.toBe(true);
  });

  it('should resolve with `false` when vitest fails', async () => {
    vi.mocked(runProcess).mockResolvedValue(false);

    await expect(runTest()).resolves.toBe(false);
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runProcess } from '../../common/run-process.ts';
import { TYPECHECK_ARGUMENTS, TYPESCRIPT_CLI } from '../consts.ts';
import { runTypecheck } from './run-typecheck.ts';

vi.mock('../../common/run-process.ts', () => ({ runProcess: vi.fn() }));

describe('runTypecheck', () => {
  beforeEach(() => {
    vi.mocked(runProcess).mockResolvedValue(true);
  });

  it('should call `runProcess` with the TypeScript CLI and the typecheck arguments when the typecheck runs', async () => {
    await runTypecheck();

    expect(runProcess).toHaveBeenCalledWith(
      TYPESCRIPT_CLI,
      TYPECHECK_ARGUMENTS,
    );
  });

  it('should call `runProcess` with `--noEmit` as the only argument when the typecheck runs', async () => {
    await runTypecheck();

    expect(runProcess).toHaveBeenCalledWith(expect.any(String), ['--noEmit']);
  });

  it('should resolve with `true` when `tsc` succeeds', async () => {
    await expect(runTypecheck()).resolves.toBe(true);
  });

  it('should resolve with `false` when `tsc` fails', async () => {
    vi.mocked(runProcess).mockResolvedValue(false);

    await expect(runTypecheck()).resolves.toBe(false);
  });
});

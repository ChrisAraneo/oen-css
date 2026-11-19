import { describe, expect, it, vi } from 'vitest';
import { runAfterSuccess } from './run-after-success.ts';

describe('runAfterSuccess', () => {
  it('should call the next step and resolve with `true` when the earlier step succeeded', async () => {
    const run = vi.fn(() => Promise.resolve(true));

    await expect(runAfterSuccess(true, run)).resolves.toBe(true);
    expect(run).toHaveBeenCalledTimes(1);
  });

  it('should not call the next step and resolve with `false` when the earlier step failed', async () => {
    const run = vi.fn(() => Promise.resolve(true));

    await expect(runAfterSuccess(false, run)).resolves.toBe(false);
    expect(run).not.toHaveBeenCalled();
  });

  it('should resolve with `false` when the next step fails', async () => {
    await expect(
      runAfterSuccess(true, () => Promise.resolve(false)),
    ).resolves.toBe(false);
  });

  it('should reject with the step error when the next step rejects', async () => {
    await expect(
      runAfterSuccess(true, () => Promise.reject(new Error('boom'))),
    ).rejects.toThrow('boom');
  });
});

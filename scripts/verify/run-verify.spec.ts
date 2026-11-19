import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readVerifyInputs } from './internal/read-verify-inputs.ts';
import { validateEveryArtifact } from './internal/validate-every-artifact.ts';
import { writeVerifyReport } from './internal/write-verify-report.ts';
import { runVerify } from './run-verify.ts';
import type { VerifyInputs } from './types/verify-inputs.ts';

vi.mock('./internal/read-verify-inputs.ts', () => ({
  readVerifyInputs: vi.fn(),
}));
vi.mock('./internal/validate-every-artifact.ts', () => ({
  validateEveryArtifact: vi.fn(),
}));
vi.mock('./internal/write-verify-report.ts', () => ({
  writeVerifyReport: vi.fn(),
}));

const INPUTS = {} as VerifyInputs;

const RESULTS = [{ name: 'a', detail: 'x', issue: undefined }];

describe('runVerify', () => {
  beforeEach(() => {
    vi.mocked(readVerifyInputs).mockResolvedValue(INPUTS);
    vi.mocked(validateEveryArtifact).mockReturnValue(RESULTS);
    vi.mocked(writeVerifyReport).mockReturnValue(true);
  });

  it('should pass the inputs to the checks and the results to the report when the verification runs', async () => {
    await runVerify();

    expect(validateEveryArtifact).toHaveBeenCalledWith(INPUTS);
    expect(writeVerifyReport).toHaveBeenCalledWith(RESULTS);
  });

  it('should resolve with `true` when every check passed', async () => {
    await expect(runVerify()).resolves.toBe(true);
  });

  it('should resolve with `false` when a check failed', async () => {
    vi.mocked(writeVerifyReport).mockReturnValue(false);

    await expect(runVerify()).resolves.toBe(false);
  });

  it('should call `readVerifyInputs` once when the verification runs', async () => {
    await runVerify();

    expect(readVerifyInputs).toHaveBeenCalledTimes(1);
  });

  it('should reject with the read error when the artifacts cannot be read', async () => {
    vi.mocked(readVerifyInputs).mockRejectedValue(new Error('ENOENT'));

    await expect(runVerify()).rejects.toThrow('ENOENT');
  });
});

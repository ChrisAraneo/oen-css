import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runBuild } from '../../build/run-build.ts';
import { runVerify } from '../../verify/run-verify.ts';
import { runVerifiedBuild } from './run-verified-build.ts';

vi.mock('../../build/run-build.ts', () => ({ runBuild: vi.fn() }));
vi.mock('../../verify/run-verify.ts', () => ({ runVerify: vi.fn() }));

const now = () => 0;

describe('runVerifiedBuild', () => {
  beforeEach(() => {
    vi.mocked(runBuild).mockResolvedValue(true);
    vi.mocked(runVerify).mockResolvedValue(true);
  });

  it('should resolve with `true` and call `runVerify` when the build succeeds', async () => {
    await expect(runVerifiedBuild(now)).resolves.toBe(true);
    expect(runBuild).toHaveBeenCalledWith(now);
    expect(runVerify).toHaveBeenCalledTimes(1);
  });

  it('should not call `runVerify` when the build failed', async () => {
    vi.mocked(runBuild).mockResolvedValue(false);

    await expect(runVerifiedBuild(now)).resolves.toBe(false);
    expect(runVerify).not.toHaveBeenCalled();
  });

  it('should resolve with `false` when the verification fails', async () => {
    vi.mocked(runVerify).mockResolvedValue(false);

    await expect(runVerifiedBuild(now)).resolves.toBe(false);
  });

  it('should pass the clock to `runBuild` when the build runs', async () => {
    const clock = () => 42;
    await runVerifiedBuild(clock);

    expect(runBuild).toHaveBeenCalledWith(clock);
  });
});

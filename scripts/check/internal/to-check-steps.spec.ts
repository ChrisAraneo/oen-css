import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runBuild } from '../../build/run-build.ts';
import { runFormat } from '../../format/run-format.ts';
import { runVerify } from '../../verify/run-verify.ts';
import { runStoriesCheck } from '../stories/run-stories-check.ts';
import { runTest } from './run-test.ts';
import { runTypecheck } from './run-typecheck.ts';
import { toCheckSteps } from './to-check-steps.ts';

vi.mock('../../build/run-build.ts', () => ({ runBuild: vi.fn() }));
vi.mock('../../format/run-format.ts', () => ({ runFormat: vi.fn() }));
vi.mock('../../verify/run-verify.ts', () => ({ runVerify: vi.fn() }));
vi.mock('../stories/run-stories-check.ts', () => ({
  runStoriesCheck: vi.fn(),
}));
vi.mock('./run-test.ts', () => ({ runTest: vi.fn() }));
vi.mock('./run-typecheck.ts', () => ({ runTypecheck: vi.fn() }));

const now = () => 0;

describe('toCheckSteps', () => {
  beforeEach(() => {
    vi.mocked(runFormat).mockResolvedValue(true);
    vi.mocked(runBuild).mockResolvedValue(true);
  });

  it('should return the six step names in pipeline order when called with the clock', () => {
    expect(toCheckSteps(now).map(({ name }) => name)).toEqual([
      'format',
      'typecheck',
      'test',
      'build',
      'verify',
      'stories',
    ]);
  });

  it('should return a flag for every step when called with the clock', () => {
    expect(toCheckSteps(now).map(({ flag }) => flag)).toEqual([
      '--format',
      '--types',
      '--test',
      '--build',
      '--verify',
      '--stories',
    ]);
  });

  it('should pass `true` to `runFormat` when the format step runs', async () => {
    await toCheckSteps(now)
      .find(({ name }) => name === 'format')
      ?.run();

    expect(runFormat).toHaveBeenCalledWith(true);
  });

  it('should pass the clock to `runBuild` when the build step runs', async () => {
    await toCheckSteps(now)
      .find(({ name }) => name === 'build')
      ?.run();

    expect(runBuild).toHaveBeenCalledWith(now);
  });

  it('should call the typecheck, test, verify, and stories commands once each when those steps run', async () => {
    const steps = toCheckSteps(now);
    await steps.find(({ name }) => name === 'typecheck')?.run();
    await steps.find(({ name }) => name === 'test')?.run();
    await steps.find(({ name }) => name === 'verify')?.run();
    await steps.find(({ name }) => name === 'stories')?.run();

    expect(runTypecheck).toHaveBeenCalledTimes(1);
    expect(runTest).toHaveBeenCalledTimes(1);
    expect(runVerify).toHaveBeenCalledTimes(1);
    expect(runStoriesCheck).toHaveBeenCalledTimes(1);
  });

  it('should return the test step before the build step when called with the clock', () => {
    const names = toCheckSteps(now).map(({ name }) => name);

    expect(names.indexOf('test')).toBeLessThan(names.indexOf('build'));
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  BULMA_LICENSE_FILE,
  BULMA_MANIFEST,
  OEN_LICENSE_FILE,
} from '../../common/consts.ts';
import { readTextFile } from '../../common/read-text-file.ts';
import { readCompiledOenStylesheet } from '../../common/sass/read-compiled-oen-stylesheet.ts';
import type { BuildInputs } from '../types/build-inputs.ts';
import { readBuildInputs } from './read-build-inputs.ts';
import { toBuildInputs } from './to-build-inputs.ts';

vi.mock('../../common/read-text-file.ts', () => ({ readTextFile: vi.fn() }));
vi.mock('../../common/sass/read-compiled-oen-stylesheet.ts', () => ({
  readCompiledOenStylesheet: vi.fn(),
}));
vi.mock('./to-build-inputs.ts', () => ({ toBuildInputs: vi.fn() }));

const INPUTS = { version: '0.2.1' } as BuildInputs;

describe('readBuildInputs', () => {
  beforeEach(() => {
    vi.mocked(readTextFile).mockImplementation((path) =>
      Promise.resolve({ path, text: `text of ${path}`, issue: undefined }),
    );
    vi.mocked(readCompiledOenStylesheet).mockReturnValue({
      css: 'body {}',
      issue: undefined,
    });
    vi.mocked(toBuildInputs).mockReturnValue(INPUTS);
  });

  it('should call `readTextFile` with the Bulma manifest and both licenses when the inputs are read', async () => {
    await readBuildInputs(() => 0);

    expect(readTextFile).toHaveBeenCalledWith(BULMA_MANIFEST);
    expect(readTextFile).toHaveBeenCalledWith(BULMA_LICENSE_FILE);
    expect(readTextFile).toHaveBeenCalledWith(OEN_LICENSE_FILE);
  });

  it('should call `readTextFile` with our own `package.json` when the inputs are read', async () => {
    await readBuildInputs(() => 0);

    expect(readTextFile).toHaveBeenCalledWith(
      expect.stringContaining('package.json'),
    );
  });

  it('should call `readTextFile` four times when the inputs are read', async () => {
    await readBuildInputs(() => 0);

    expect(readTextFile).toHaveBeenCalledTimes(4);
  });

  it('should pass the compiled stylesheet to `toBuildInputs` when the inputs are read', async () => {
    await readBuildInputs(() => 0);

    expect(toBuildInputs).toHaveBeenCalledWith(
      expect.objectContaining({
        stylesheet: { css: 'body {}', issue: undefined },
      }),
      expect.any(Number),
    );
  });

  it('should pass the start time to `toBuildInputs` when the clock returns 1234', async () => {
    await readBuildInputs(() => 1234);

    expect(toBuildInputs).toHaveBeenCalledWith(expect.anything(), 1234);
  });

  it('should resolve with the gathered inputs when the inputs are read', async () => {
    await expect(readBuildInputs(() => 0)).resolves.toBe(INPUTS);
  });
});

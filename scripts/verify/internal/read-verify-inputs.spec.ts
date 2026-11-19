import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  BULMA_LICENSE_FILE,
  BULMA_MANIFEST,
  OEN_LICENSE_FILE,
} from '../../common/consts.ts';
import { readDistFile } from '../../common/dist/read-dist-file.ts';
import { readTextFile } from '../../common/read-text-file.ts';
import { readCompiledBulmaStylesheet } from '../../common/sass/read-compiled-bulma-stylesheet.ts';
import { readVerifyInputs } from './read-verify-inputs.ts';

vi.mock('../../common/dist/read-dist-file.ts', () => ({
  readDistFile: vi.fn(),
}));
vi.mock('../../common/read-text-file.ts', () => ({ readTextFile: vi.fn() }));
vi.mock('../../common/sass/read-compiled-bulma-stylesheet.ts', () => ({
  readCompiledBulmaStylesheet: vi.fn(),
}));

describe('readVerifyInputs', () => {
  beforeEach(() => {
    vi.mocked(readDistFile).mockImplementation((file) =>
      Promise.resolve({ path: `dist/${file}`, text: file, issue: undefined }),
    );
    vi.mocked(readTextFile).mockImplementation((path) =>
      Promise.resolve({ path, text: path, issue: undefined }),
    );
    vi.mocked(readCompiledBulmaStylesheet).mockReturnValue({
      css: 'body{}',
      issue: undefined,
    });
  });

  it('should call `readDistFile` five times when the inputs are read', async () => {
    await readVerifyInputs();

    expect(readDistFile).toHaveBeenCalledTimes(5);
  });

  it('should call `readDistFile` with both stylesheets when the inputs are read', async () => {
    await readVerifyInputs();

    expect(readDistFile).toHaveBeenCalledWith('oen.css');
    expect(readDistFile).toHaveBeenCalledWith('oen.min.css');
  });

  it('should call `readTextFile` with both repository licenses when the inputs are read', async () => {
    await readVerifyInputs();

    expect(readTextFile).toHaveBeenCalledWith(OEN_LICENSE_FILE);
    expect(readTextFile).toHaveBeenCalledWith(BULMA_LICENSE_FILE);
  });

  it('should call `readTextFile` with the Bulma manifest when the inputs are read', async () => {
    await readVerifyInputs();

    expect(readTextFile).toHaveBeenCalledWith(BULMA_MANIFEST);
  });

  it('should resolve with the compiled upstream stylesheet when the inputs are read', async () => {
    expect((await readVerifyInputs()).upstreamBulmaStylesheet).toEqual({
      css: 'body{}',
      issue: undefined,
    });
  });

  it('should resolve with each artifact in its own field when the inputs are read', async () => {
    const inputs = await readVerifyInputs();

    expect(inputs.stylesheet.text).toBe('oen.css');
    expect(inputs.minifiedStylesheet.text).toBe('oen.min.css');
    expect(inputs.thirdPartyNotices.text).toBe('THIRD-PARTY-NOTICES.md');
  });
});

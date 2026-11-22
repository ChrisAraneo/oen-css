import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BULMA_LICENSE_FILE, BULMA_MANIFEST } from '../../common/consts.ts';
import { readPackageFile } from '../../common/package/read-package-file.ts';
import { readTextFile } from '../../common/read-text-file.ts';
import { readCompiledBulmaStylesheet } from '../../common/sass/read-compiled-bulma-stylesheet.ts';
import { readVerifyInputs } from './read-verify-inputs.ts';

vi.mock('../../common/package/read-package-file.ts', () => ({
  readPackageFile: vi.fn(),
}));
vi.mock('../../common/read-text-file.ts', () => ({ readTextFile: vi.fn() }));
vi.mock('../../common/sass/read-compiled-bulma-stylesheet.ts', () => ({
  readCompiledBulmaStylesheet: vi.fn(),
}));

describe('readVerifyInputs', () => {
  beforeEach(() => {
    vi.mocked(readPackageFile).mockImplementation((file) =>
      Promise.resolve({ path: `${file}`, text: file, issue: undefined }),
    );
    vi.mocked(readTextFile).mockImplementation((path) =>
      Promise.resolve({ path, text: path, issue: undefined }),
    );
    vi.mocked(readCompiledBulmaStylesheet).mockReturnValue({
      css: 'body{}',
      issue: undefined,
    });
  });

  it('should call `readPackageFile` seven times when the inputs are read', async () => {
    await readVerifyInputs();

    expect(readPackageFile).toHaveBeenCalledTimes(7);
  });

  it('should call `readPackageFile` with both stylesheets when the inputs are read', async () => {
    await readVerifyInputs();

    expect(readPackageFile).toHaveBeenCalledWith('oen.css');
    expect(readPackageFile).toHaveBeenCalledWith('oen.min.css');
  });

  it('should call `readTextFile` with the upstream Bulma license when the inputs are read', async () => {
    await readVerifyInputs();

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
    expect(inputs.thirdPartyNotices.text).toBe('THIRD_PARTY_NOTICES.md');
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readTextFile } from '../read-text-file.ts';
import { toPackagePath } from './to-package-path.ts';
import { readPackageFile } from './read-package-file.ts';

vi.mock('../read-text-file.ts', () => ({ readTextFile: vi.fn() }));

describe('readPackageFile', () => {
  beforeEach(() => {
    vi.mocked(readTextFile).mockResolvedValue({
      path: toPackagePath('oen.css'),
      text: 'body {}',
      issue: undefined,
    });
  });

  it('should pass the package path to `readTextFile` when called with `oen.css`', async () => {
    await readPackageFile('oen.css');

    expect(readTextFile).toHaveBeenCalledWith(toPackagePath('oen.css'));
  });

  it('should resolve with the text file when the read succeeds', async () => {
    await expect(readPackageFile('oen.css')).resolves.toEqual({
      path: toPackagePath('oen.css'),
      text: 'body {}',
      issue: undefined,
    });
  });

  it('should pass the package path to `readTextFile` when called with `LICENSE-bulma`', async () => {
    await readPackageFile('LICENSE-bulma');

    expect(readTextFile).toHaveBeenCalledWith(toPackagePath('LICENSE-bulma'));
  });

  it('should resolve with the read issue when the file could not be read', async () => {
    vi.mocked(readTextFile).mockResolvedValue({
      path: toPackagePath('oen.css'),
      text: '',
      issue: 'oen.css could not be read: ENOENT',
    });

    expect((await readPackageFile('oen.css')).issue).toBe(
      'oen.css could not be read: ENOENT',
    );
  });

  it('should call `readTextFile` once when the file is read', async () => {
    await readPackageFile('oen.min.css');

    expect(readTextFile).toHaveBeenCalledTimes(1);
  });
});

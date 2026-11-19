import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readTextFile } from '../read-text-file.ts';
import { toDistPath } from './internal/to-dist-path.ts';
import { readDistFile } from './read-dist-file.ts';

vi.mock('../read-text-file.ts', () => ({ readTextFile: vi.fn() }));

describe('readDistFile', () => {
  beforeEach(() => {
    vi.mocked(readTextFile).mockResolvedValue({
      path: toDistPath('oen.css'),
      text: 'body {}',
      issue: undefined,
    });
  });

  it('should pass the dist path to `readTextFile` when called with `oen.css`', async () => {
    await readDistFile('oen.css');

    expect(readTextFile).toHaveBeenCalledWith(toDistPath('oen.css'));
  });

  it('should resolve with the text file when the read succeeds', async () => {
    await expect(readDistFile('oen.css')).resolves.toEqual({
      path: toDistPath('oen.css'),
      text: 'body {}',
      issue: undefined,
    });
  });

  it('should pass the dist path to `readTextFile` when called with `LICENSE-bulma`', async () => {
    await readDistFile('LICENSE-bulma');

    expect(readTextFile).toHaveBeenCalledWith(toDistPath('LICENSE-bulma'));
  });

  it('should resolve with the read issue when the file could not be read', async () => {
    vi.mocked(readTextFile).mockResolvedValue({
      path: toDistPath('oen.css'),
      text: '',
      issue: 'dist/oen.css could not be read: ENOENT',
    });

    expect((await readDistFile('oen.css')).issue).toBe(
      'dist/oen.css could not be read: ENOENT',
    );
  });

  it('should call `readTextFile` once when the file is read', async () => {
    await readDistFile('oen.min.css');

    expect(readTextFile).toHaveBeenCalledTimes(1);
  });
});

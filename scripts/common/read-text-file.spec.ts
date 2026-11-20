import { readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { REPOSITORY_ROOT } from './consts.ts';
import { readTextFile } from './read-text-file.ts';

vi.mock('node:fs/promises', () => ({ readFile: vi.fn() }));

const PATH = resolve(REPOSITORY_ROOT, 'oen.css');

describe('readTextFile', () => {
  beforeEach(() => {
    vi.mocked(readFile).mockResolvedValue('body {}');
  });

  it('should resolve with the path, the text, and no issue when the read succeeds', async () => {
    await expect(readTextFile(PATH)).resolves.toEqual({
      path: PATH,
      text: 'body {}',
      issue: undefined,
    });
  });

  it('should call `readFile` with `utf8` when the file is read', async () => {
    await readTextFile(PATH);

    expect(readFile).toHaveBeenCalledWith(PATH, 'utf8');
  });

  it('should resolve with the read issue when the file is missing', async () => {
    vi.mocked(readFile).mockRejectedValue(new Error('ENOENT'));

    await expect(readTextFile(PATH)).resolves.toEqual({
      path: PATH,
      text: '',
      issue: `${relative(REPOSITORY_ROOT, PATH)} could not be read: ENOENT`,
    });
  });

  it('should resolve with an empty string as the text when the read fails', async () => {
    vi.mocked(readFile).mockRejectedValue(new Error('EACCES'));

    expect((await readTextFile(PATH)).text).toBe('');
  });

  it('should resolve with the given path when the read fails', async () => {
    vi.mocked(readFile).mockRejectedValue(new Error('EACCES'));

    expect((await readTextFile(PATH)).path).toBe(PATH);
  });

  it('should resolve with an empty string and no issue when the file is empty', async () => {
    vi.mocked(readFile).mockResolvedValue('');

    await expect(readTextFile(PATH)).resolves.toEqual({
      path: PATH,
      text: '',
      issue: undefined,
    });
  });
});

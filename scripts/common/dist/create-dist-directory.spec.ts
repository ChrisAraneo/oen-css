import { mkdir } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { DIST_DIRECTORY } from '../consts.ts';
import { createDistDirectory } from './create-dist-directory.ts';

vi.mock('node:fs/promises', () => ({ mkdir: vi.fn() }));

describe('createDistDirectory', () => {
  it('should call `mkdir` with the dist directory when the directory is created', async () => {
    await createDistDirectory();

    expect(mkdir).toHaveBeenCalledWith(DIST_DIRECTORY, { recursive: true });
  });

  it('should call `mkdir` with `recursive: true` when the directory is created', async () => {
    await createDistDirectory();

    expect(mkdir).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ recursive: true }),
    );
  });

  it('should resolve with `undefined` when the directory already exists', async () => {
    vi.mocked(mkdir).mockResolvedValue(undefined);

    await expect(createDistDirectory()).resolves.toBe(undefined);
  });

  it('should resolve with the created path when the directory did not exist', async () => {
    vi.mocked(mkdir).mockResolvedValue(DIST_DIRECTORY);

    await expect(createDistDirectory()).resolves.toBe(DIST_DIRECTORY);
  });

  it('should reject with the `mkdir` error when the directory cannot be created', async () => {
    vi.mocked(mkdir).mockRejectedValue(new Error('EACCES'));

    await expect(createDistDirectory()).rejects.toThrow('EACCES');
  });
});

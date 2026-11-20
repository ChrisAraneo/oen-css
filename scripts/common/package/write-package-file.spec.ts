import { writeFile } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { toPackagePath } from './to-package-path.ts';
import { writePackageFile } from './write-package-file.ts';

vi.mock('node:fs/promises', () => ({ writeFile: vi.fn() }));

describe('writePackageFile', () => {
  it('should call `writeFile` with the package path, the text, and `utf8` when called with `oen.css`', async () => {
    await writePackageFile('oen.css', 'body {}');

    expect(writeFile).toHaveBeenCalledWith(
      toPackagePath('oen.css'),
      'body {}',
      'utf8',
    );
  });

  it('should call `writeFile` with the package path of `oen.min.css` when called with it', async () => {
    await writePackageFile('oen.min.css', 'body{}');

    expect(writeFile).toHaveBeenCalledWith(
      toPackagePath('oen.min.css'),
      'body{}',
      'utf8',
    );
  });

  it('should call `writeFile` with the package path of the notices when called with them', async () => {
    await writePackageFile('THIRD_PARTY_NOTICES.md', '# Notices');

    expect(writeFile).toHaveBeenCalledWith(
      toPackagePath('THIRD_PARTY_NOTICES.md'),
      '# Notices',
      'utf8',
    );
  });

  it('should call `writeFile` once when the file is written', async () => {
    await writePackageFile('LICENSE', 'MIT');

    expect(writeFile).toHaveBeenCalledTimes(1);
  });

  it('should reject with the write error when the write fails', async () => {
    vi.mocked(writeFile).mockRejectedValueOnce(new Error('EACCES'));

    await expect(writePackageFile('oen.css', 'body {}')).rejects.toThrow(
      'EACCES',
    );
  });
});

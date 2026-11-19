import { writeFile } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { toDistPath } from './internal/to-dist-path.ts';
import { writeDistFile } from './write-dist-file.ts';

vi.mock('node:fs/promises', () => ({ writeFile: vi.fn() }));

describe('writeDistFile', () => {
  it('should call `writeFile` with the dist path, the text, and `utf8` when called with `oen.css`', async () => {
    await writeDistFile('oen.css', 'body {}');

    expect(writeFile).toHaveBeenCalledWith(
      toDistPath('oen.css'),
      'body {}',
      'utf8',
    );
  });

  it('should call `writeFile` with the dist path of `oen.min.css` when called with it', async () => {
    await writeDistFile('oen.min.css', 'body{}');

    expect(writeFile).toHaveBeenCalledWith(
      toDistPath('oen.min.css'),
      'body{}',
      'utf8',
    );
  });

  it('should call `writeFile` with the dist path of the notices when called with them', async () => {
    await writeDistFile('THIRD-PARTY-NOTICES.md', '# Notices');

    expect(writeFile).toHaveBeenCalledWith(
      toDistPath('THIRD-PARTY-NOTICES.md'),
      '# Notices',
      'utf8',
    );
  });

  it('should call `writeFile` once when the file is written', async () => {
    await writeDistFile('LICENSE', 'MIT');

    expect(writeFile).toHaveBeenCalledTimes(1);
  });

  it('should reject with the write error when the write fails', async () => {
    vi.mocked(writeFile).mockRejectedValueOnce(new Error('EACCES'));

    await expect(writeDistFile('oen.css', 'body {}')).rejects.toThrow('EACCES');
  });
});

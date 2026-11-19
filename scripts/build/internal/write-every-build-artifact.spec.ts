import { writeFile } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { createDistDirectory } from '../../common/dist/create-dist-directory.ts';
import { writeDistFile } from '../../common/dist/write-dist-file.ts';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import { writeEveryBuildArtifact } from './write-every-build-artifact.ts';

vi.mock('node:fs/promises', () => ({ writeFile: vi.fn() }));
vi.mock('../../common/dist/create-dist-directory.ts', () => ({
  createDistDirectory: vi.fn(() => Promise.resolve(undefined)),
}));
vi.mock('../../common/dist/write-dist-file.ts', () => ({
  writeDistFile: vi.fn(() => Promise.resolve()),
}));

const ARTIFACTS: BuildArtifacts = {
  version: '0.2.1',
  bulmaVersion: '1.0.4',
  startedAt: 0,
  stylesheet: 'body {}',
  minifiedStylesheet: 'body{}',
  oenLicense: 'Our MIT',
  bulmaLicense: 'Bulma MIT',
  thirdPartyNotices: '# Notices',
  appliedMappings: [],
  embeddedLicenseComments: [],
  warnings: [],
  issues: [],
};

describe('writeEveryBuildArtifact', () => {
  it('should call `createDistDirectory` once when the artifacts are written', async () => {
    await writeEveryBuildArtifact(ARTIFACTS);

    expect(createDistDirectory).toHaveBeenCalledTimes(1);
  });

  it('should call `writeDistFile` with both stylesheets when the artifacts are written', async () => {
    await writeEveryBuildArtifact(ARTIFACTS);

    expect(writeDistFile).toHaveBeenCalledWith('oen.css', 'body {}');
    expect(writeDistFile).toHaveBeenCalledWith('oen.min.css', 'body{}');
  });

  it('should call `writeDistFile` with both licenses and the notices when the artifacts are written', async () => {
    await writeEveryBuildArtifact(ARTIFACTS);

    expect(writeDistFile).toHaveBeenCalledWith('LICENSE', 'Our MIT');
    expect(writeDistFile).toHaveBeenCalledWith('LICENSE-bulma', 'Bulma MIT');
    expect(writeDistFile).toHaveBeenCalledWith(
      'THIRD-PARTY-NOTICES.md',
      '# Notices',
    );
  });

  it('should call `writeFile` with the notices at the repository root when the artifacts are written', async () => {
    await writeEveryBuildArtifact(ARTIFACTS);

    expect(writeFile).toHaveBeenCalledWith(
      expect.stringContaining('THIRD-PARTY-NOTICES.md'),
      '# Notices',
      'utf8',
    );
  });

  it('should call `writeDistFile` five times when the artifacts are written', async () => {
    await writeEveryBuildArtifact(ARTIFACTS);

    expect(writeDistFile).toHaveBeenCalledTimes(5);
  });

  it('should resolve with the artifacts when every write succeeds', async () => {
    await expect(writeEveryBuildArtifact(ARTIFACTS)).resolves.toBe(ARTIFACTS);
  });

  it('should reject with the write error when a dist write fails', async () => {
    vi.mocked(writeDistFile).mockRejectedValueOnce(new Error('EACCES'));

    await expect(writeEveryBuildArtifact(ARTIFACTS)).rejects.toThrow('EACCES');
  });
});

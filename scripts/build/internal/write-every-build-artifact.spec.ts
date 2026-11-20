import { describe, expect, it, vi } from 'vitest';
import { writePackageFile } from '../../common/package/write-package-file.ts';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import { writeEveryBuildArtifact } from './write-every-build-artifact.ts';

vi.mock('../../common/package/write-package-file.ts', () => ({
  writePackageFile: vi.fn(() => Promise.resolve()),
}));

const ARTIFACTS: BuildArtifacts = {
  version: '0.2.1',
  bulmaVersion: '1.0.4',
  startedAt: 0,
  stylesheet: 'body {}',
  minifiedStylesheet: 'body{}',
  bulmaLicense: 'Bulma MIT',
  thirdPartyNotices: '# Notices',
  appliedMappings: [],
  embeddedLicenseComments: [],
  warnings: [],
  issues: [],
};

describe('writeEveryBuildArtifact', () => {
  it('should call `writePackageFile` with both stylesheets when the artifacts are written', async () => {
    await writeEveryBuildArtifact(ARTIFACTS);

    expect(writePackageFile).toHaveBeenCalledWith('oen.css', 'body {}');
    expect(writePackageFile).toHaveBeenCalledWith('oen.min.css', 'body{}');
  });

  it("should call `writePackageFile` with Bulma's license and the notices when the artifacts are written", async () => {
    await writeEveryBuildArtifact(ARTIFACTS);

    expect(writePackageFile).toHaveBeenCalledWith('LICENSE-bulma', 'Bulma MIT');
    expect(writePackageFile).toHaveBeenCalledWith(
      'THIRD_PARTY_NOTICES.md',
      '# Notices',
    );
  });

  it('should not call `writePackageFile` with the own license when the artifacts are written', async () => {
    await writeEveryBuildArtifact(ARTIFACTS);

    expect(writePackageFile).not.toHaveBeenCalledWith(
      'LICENSE',
      expect.anything(),
    );
  });

  it('should call `writePackageFile` four times when the artifacts are written', async () => {
    await writeEveryBuildArtifact(ARTIFACTS);

    expect(writePackageFile).toHaveBeenCalledTimes(4);
  });

  it('should resolve with the artifacts when every write succeeds', async () => {
    await expect(writeEveryBuildArtifact(ARTIFACTS)).resolves.toBe(ARTIFACTS);
  });

  it('should reject with the write error when a package write fails', async () => {
    vi.mocked(writePackageFile).mockRejectedValueOnce(new Error('EACCES'));

    await expect(writeEveryBuildArtifact(ARTIFACTS)).rejects.toThrow('EACCES');
  });
});

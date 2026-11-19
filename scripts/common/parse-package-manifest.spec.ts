import { describe, expect, it } from 'vitest';
import { parsePackageManifest } from './parse-package-manifest.ts';

describe('parsePackageManifest', () => {
  it('should return the version, the homepage, and the Bulma version when the json declares all three', () => {
    expect(
      parsePackageManifest(
        '{"version":"0.2.1","homepage":"https://example.com","oen":{"bulmaVersion":"1.0.4"}}',
      ),
    ).toEqual({
      version: '0.2.1',
      homepage: 'https://example.com',
      bulmaVersion: '1.0.4',
    });
  });

  it('should return the defaults when the json is malformed', () => {
    expect(parsePackageManifest('{not json}')).toEqual({
      version: '0.0.0',
      homepage: undefined,
      bulmaVersion: undefined,
    });
  });

  it('should return `0.0.0` as the version when the file is empty', () => {
    expect(parsePackageManifest('').version).toBe('0.0.0');
  });

  it('should return the version and no other field when the json declares only a version', () => {
    expect(parsePackageManifest('{"version":"1.2.3"}')).toEqual({
      version: '1.2.3',
      homepage: undefined,
      bulmaVersion: undefined,
    });
  });

  it('should return only the build fields when the json declares more', () => {
    expect(
      parsePackageManifest('{"version":"1.0.0","scripts":{"build":"x"}}'),
    ).toEqual({
      version: '1.0.0',
      homepage: undefined,
      bulmaVersion: undefined,
    });
  });
});

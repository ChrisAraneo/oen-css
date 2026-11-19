import { describe, expect, it } from 'vitest';
import { toPackageManifest } from './to-package-manifest.ts';

describe('toPackageManifest', () => {
  it('should return the version, the homepage, and the Bulma version when the manifest declares all three', () => {
    expect(
      toPackageManifest({
        version: '0.2.1',
        homepage: 'https://example.com#readme',
        oen: { bulmaVersion: '1.0.4' },
      }),
    ).toEqual({
      version: '0.2.1',
      homepage: 'https://example.com#readme',
      bulmaVersion: '1.0.4',
    });
  });

  it('should return `0.0.0` as the version when the manifest declares none', () => {
    expect(toPackageManifest({}).version).toBe('0.0.0');
  });

  it('should return `undefined` as the homepage when the manifest declares none', () => {
    expect(toPackageManifest({}).homepage).toBe(undefined);
  });

  it('should return `undefined` as the Bulma version when the manifest declares none', () => {
    expect(toPackageManifest({}).bulmaVersion).toBe(undefined);
  });

  it('should return the defaults when the fields are of the wrong type', () => {
    expect(toPackageManifest({ version: 1, homepage: [] })).toEqual({
      version: '0.0.0',
      homepage: undefined,
      bulmaVersion: undefined,
    });
  });

  it('should return the defaults when the manifest is `undefined`', () => {
    expect(toPackageManifest(undefined)).toEqual({
      version: '0.0.0',
      homepage: undefined,
      bulmaVersion: undefined,
    });
  });
});

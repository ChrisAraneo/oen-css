import type { PackageManifest } from '../types/package-manifest.ts';
import { tryParseStringField } from './try-parse-string-field.ts';

const UNDECLARED_VERSION = '0.0.0';

export const toPackageManifest = (manifest: unknown): PackageManifest => ({
  version: tryParseStringField(manifest, 'version') ?? UNDECLARED_VERSION,
  homepage: tryParseStringField(manifest, 'homepage'),
  bulmaVersion: tryParseStringField(manifest, 'oen.bulmaVersion'),
});

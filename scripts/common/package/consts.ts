import type { PackageFile } from './types/package-file.ts';

export const OEN_STYLESHEET: PackageFile = 'oen.css';

export const OEN_MINIFIED_STYLESHEET: PackageFile = 'oen.min.css';

export const OEN_LICENSE: PackageFile = 'LICENSE';

export const BULMA_LICENSE: PackageFile = 'LICENSE-bulma';

export const THIRD_PARTY_NOTICES: PackageFile = 'THIRD_PARTY_NOTICES.md';

export const EVERY_PACKAGE_FILE: readonly PackageFile[] = Object.freeze([
  OEN_STYLESHEET,
  OEN_MINIFIED_STYLESHEET,
  OEN_LICENSE,
  BULMA_LICENSE,
  THIRD_PARTY_NOTICES,
]);

export const BOTH_STYLESHEETS: readonly PackageFile[] = Object.freeze([
  OEN_STYLESHEET,
  OEN_MINIFIED_STYLESHEET,
]);

import type { DistFile } from './types/dist-file.ts';

export const OEN_STYLESHEET: DistFile = 'oen.css';
export const OEN_MINIFIED_STYLESHEET: DistFile = 'oen.min.css';
export const OEN_LICENSE: DistFile = 'LICENSE';
export const BULMA_LICENSE: DistFile = 'LICENSE-bulma';
export const THIRD_PARTY_NOTICES: DistFile = 'THIRD-PARTY-NOTICES.md';

export const EVERY_DIST_FILE: readonly DistFile[] = Object.freeze([
  OEN_STYLESHEET,
  OEN_MINIFIED_STYLESHEET,
  OEN_LICENSE,
  BULMA_LICENSE,
  THIRD_PARTY_NOTICES,
]);

export const BOTH_STYLESHEETS: readonly DistFile[] = Object.freeze([OEN_STYLESHEET, OEN_MINIFIED_STYLESHEET]);

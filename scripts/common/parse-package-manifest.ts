import { pipe } from 'remeda';
import { toPackageManifest } from './internal/to-package-manifest.ts';
import { tryParseJson } from './internal/try-parse-json.ts';
import type { PackageManifest } from './types/package-manifest.ts';

export const parsePackageManifest = (json: string): PackageManifest =>
  pipe(json, tryParseJson, toPackageManifest);

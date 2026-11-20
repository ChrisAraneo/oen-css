import { resolve } from 'node:path';
import { REPOSITORY_ROOT } from '../consts.ts';
import type { PackageFile } from './types/package-file.ts';

export const toPackagePath = (file: PackageFile): string =>
  resolve(REPOSITORY_ROOT, file);

import { readTextFile } from '../read-text-file.ts';
import type { TextFile } from '../types/text-file.ts';
import { toPackagePath } from './to-package-path.ts';
import type { PackageFile } from './types/package-file.ts';

export const readPackageFile = (file: PackageFile): Promise<TextFile> =>
  readTextFile(toPackagePath(file));

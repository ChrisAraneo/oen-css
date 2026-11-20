import { writeFile } from 'node:fs/promises';
import { toPackagePath } from './to-package-path.ts';
import type { PackageFile } from './types/package-file.ts';

export const writePackageFile = (
  file: PackageFile,
  text: string,
): Promise<void> => writeFile(toPackagePath(file), text, 'utf8');

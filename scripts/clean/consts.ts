import { map } from 'lodash-es';
import { STORYBOOK_STATIC_DIRECTORY } from '../common/consts.ts';
import {
  BULMA_LICENSE,
  OEN_MINIFIED_RUNTIME,
  OEN_MINIFIED_STYLESHEET,
  OEN_RUNTIME,
  OEN_STYLESHEET,
} from '../common/package/consts.ts';
import { toPackagePath } from '../common/package/to-package-path.ts';
import type { PackageFile } from '../common/package/types/package-file.ts';

const EVERY_UNTRACKED_PACKAGE_FILE: readonly PackageFile[] = Object.freeze([
  OEN_STYLESHEET,
  OEN_MINIFIED_STYLESHEET,
  OEN_RUNTIME,
  OEN_MINIFIED_RUNTIME,
  BULMA_LICENSE,
]);

export const GENERATED_PATHS: readonly string[] = Object.freeze([
  STORYBOOK_STATIC_DIRECTORY,
  ...map(EVERY_UNTRACKED_PACKAGE_FILE, (file) => toPackagePath(file)),
]);

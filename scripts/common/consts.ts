import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const COMMON_DIRECTORY = dirname(fileURLToPath(import.meta.url));

export const REPOSITORY_ROOT: string = resolve(COMMON_DIRECTORY, '..', '..');

export const SRC_DIRECTORY: string = resolve(REPOSITORY_ROOT, 'src');

export const STORIES_DIRECTORY: string = resolve(REPOSITORY_ROOT, 'stories');

export const STORYBOOK_STATIC_DIRECTORY: string = resolve(
  REPOSITORY_ROOT,
  'storybook-static',
);

export const NODE_MODULES_DIRECTORY: string = resolve(
  REPOSITORY_ROOT,
  'node_modules',
);

export const BULMA_MANIFEST: string = resolve(
  NODE_MODULES_DIRECTORY,
  'bulma',
  'package.json',
);

export const BULMA_LICENSE_FILE: string = resolve(
  NODE_MODULES_DIRECTORY,
  'bulma',
  'LICENSE',
);

export const BLANK_LINE = '';

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPTS_DIRECTORY = dirname(fileURLToPath(import.meta.url));

export const REPOSITORY_ROOT: string = resolve(SCRIPTS_DIRECTORY, '..');
export const SRC_DIRECTORY: string = resolve(REPOSITORY_ROOT, 'src');
export const DIST_DIRECTORY: string = resolve(REPOSITORY_ROOT, 'dist');
export const STORIES_DIRECTORY: string = resolve(REPOSITORY_ROOT, 'stories');
export const STORYBOOK_STATIC_DIRECTORY: string = resolve(
  REPOSITORY_ROOT,
  'storybook-static',
);

export const SASS_ENTRY_POINT: string = resolve(SRC_DIRECTORY, 'oen.scss');
export const STORY_ONLY_STYLESHEET: string = resolve(
  REPOSITORY_ROOT,
  '.storybook',
  'storybook.css',
);

export const OEN_MANIFEST: string = resolve(REPOSITORY_ROOT, 'package.json');
export const OEN_LICENSE_FILE: string = resolve(REPOSITORY_ROOT, 'LICENSE');
export const THIRD_PARTY_NOTICES_FILE: string = resolve(
  REPOSITORY_ROOT,
  'THIRD-PARTY-NOTICES.md',
);

export const BULMA_MANIFEST: string = resolve(
  REPOSITORY_ROOT,
  'node_modules',
  'bulma',
  'package.json',
);
export const BULMA_LICENSE_FILE: string = resolve(
  REPOSITORY_ROOT,
  'node_modules',
  'bulma',
  'LICENSE',
);

export const FAILURE_EXIT_CODE = 1;

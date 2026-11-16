import { join, split } from 'lodash-es';
import { relative, sep } from 'node:path';
import { REPOSITORY_ROOT } from '../../consts.ts';

const POSIX_SEPARATOR = '/';

export const toRepositoryRelativePath = (file: string): string =>
  join(split(relative(REPOSITORY_ROOT, file), sep), POSIX_SEPARATOR);

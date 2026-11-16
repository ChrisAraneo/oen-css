import { endsWith, some } from 'lodash-es';
import { resolve } from 'node:path';
import { match } from 'ts-pattern';

const NO_MATCHING_FILE: readonly string[] = Object.freeze([]);

export const filterMatchingFile = (
  directory: string,
  name: string,
  extensions: readonly string[],
): readonly string[] =>
  match(some(extensions, (extension) => endsWith(name, extension)))
    .with(true, () => [resolve(directory, name)])
    .otherwise(() => NO_MATCHING_FILE);

import { flatten, map } from 'lodash-es';
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { match } from 'ts-pattern';
import { filterMatchingFile } from './filter-matching-file.ts';

export const findStoryFiles = (
  directory: string,
  extensions: readonly string[],
): Promise<readonly string[]> =>
  readdir(directory, { withFileTypes: true })
    .then((entries) =>
      Promise.all(
        map(entries, (entry) =>
          match(entry.isDirectory())
            .with(true, () =>
              findStoryFiles(resolve(directory, entry.name), extensions),
            )
            .otherwise(() =>
              Promise.resolve(
                filterMatchingFile(directory, entry.name, extensions),
              ),
            ),
        ),
      ),
    )
    .then((found) => flatten(found));

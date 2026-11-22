import { isEmpty } from 'lodash-es';
import { match } from 'ts-pattern';
import type { PackageFile } from '../../common/package/types/package-file.ts';

export const formatEmptyRuntimeIssue = (
  code: string,
  file: PackageFile,
): string | undefined =>
  match(isEmpty(code))
    .with(true, () => `${file} compiled to an empty bundle`)
    .otherwise(() => undefined);

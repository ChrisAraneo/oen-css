import { isEmpty, join, map, startsWith } from 'lodash-es';
import { basename } from 'node:path';
import { match } from 'ts-pattern';
import { CHARSET_DECLARATION } from '../../banner/consts.ts';
import type { TextFile } from '../../common/types/text-file.ts';
import { findMissingBannerFragments } from './find-missing-banner-fragments.ts';

const formatMissingFragments = (
  fileName: string,
  missing: readonly string[],
): string | undefined =>
  match(isEmpty(missing))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `${fileName} banner is missing ${join(
          map(missing, (fragment) => `"${fragment}"`),
          ', ',
        )}`,
    );

export const findStylesheetHeaderProblem = ({
  path,
  text,
}: TextFile): string | undefined =>
  match(startsWith(text, CHARSET_DECLARATION))
    .with(
      false,
      () => `${basename(path)} does not start with ${CHARSET_DECLARATION}`,
    )
    .otherwise(() =>
      formatMissingFragments(basename(path), findMissingBannerFragments(text)),
    );

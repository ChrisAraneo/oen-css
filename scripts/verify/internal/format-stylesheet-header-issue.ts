import { startsWith } from 'lodash-es';
import { basename } from 'node:path';
import { match } from 'ts-pattern';
import { CHARSET_DECLARATION } from '../../../src/banner/consts.ts';
import type { TextFile } from '../../common/types/text-file.ts';
import { filterMissingBannerFragments } from './filter-missing-banner-fragments.ts';
import { formatMissingFragments } from './format-missing-fragments.ts';

export const formatStylesheetHeaderIssue = ({
  path,
  text,
}: TextFile): string | undefined =>
  match(startsWith(text, CHARSET_DECLARATION))
    .with(
      false,
      () => `${basename(path)} does not start with ${CHARSET_DECLARATION}`,
    )
    .otherwise(() =>
      formatMissingFragments(
        basename(path),
        filterMissingBannerFragments(text),
      ),
    );

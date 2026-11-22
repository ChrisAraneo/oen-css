import { startsWith } from 'lodash-es';
import { basename } from 'node:path';
import { match } from 'ts-pattern';
import { BANNER_OPENING } from '../../../src/banner/consts.ts';
import type { TextFile } from '../../common/types/text-file.ts';
import { filterMissingRuntimeBannerFragments } from './filter-missing-runtime-banner-fragments.ts';
import { formatMissingFragments } from './format-missing-fragments.ts';

export const formatRuntimeHeaderIssue = ({
  path,
  text,
}: TextFile): string | undefined =>
  match(startsWith(text, BANNER_OPENING))
    .with(
      false,
      () => `${basename(path)} does not start with ${BANNER_OPENING}`,
    )
    .otherwise(() =>
      formatMissingFragments(
        basename(path),
        filterMissingRuntimeBannerFragments(text),
      ),
    );

import { filter, includes } from 'lodash-es';
import { REQUIRED_BANNER_FRAGMENTS } from './consts.ts';
import { toStylesheetBanner } from './to-stylesheet-banner.ts';

export const findMissingBannerFragments = (css: string): readonly string[] =>
  filter(
    REQUIRED_BANNER_FRAGMENTS,
    (fragment) => !includes(toStylesheetBanner(css), fragment),
  );

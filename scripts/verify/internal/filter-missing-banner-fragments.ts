import { filter, includes } from 'lodash-es';
import { sliceStylesheetBanner } from './slice-stylesheet-banner.ts';

const REQUIRED_BANNER_FRAGMENTS: readonly string[] = Object.freeze([
  'oen-css v',
  'MIT License',
  'Bulma v',
  'Copyright (c)',
  'LICENSE-bulma',
]);

export const filterMissingBannerFragments = (css: string): readonly string[] =>
  filter(
    REQUIRED_BANNER_FRAGMENTS,
    (fragment) => !includes(sliceStylesheetBanner(css), fragment),
  );

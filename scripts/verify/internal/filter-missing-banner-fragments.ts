import { filter, includes } from 'lodash-es';
import { sliceArtifactBanner } from './slice-artifact-banner.ts';

const REQUIRED_BANNER_FRAGMENTS: readonly string[] = Object.freeze([
  'oen-css v',
  'MIT License',
  'Bulma v',
  'Copyright (c)',
  'LICENSE-bulma',
]);

export const filterMissingBannerFragments = (text: string): readonly string[] =>
  filter(
    REQUIRED_BANNER_FRAGMENTS,
    (fragment) => !includes(sliceArtifactBanner(text), fragment),
  );

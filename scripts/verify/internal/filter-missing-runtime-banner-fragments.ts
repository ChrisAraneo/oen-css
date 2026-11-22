import { filter, includes } from 'lodash-es';
import {
  PAPER_SHADERS_COPYRIGHT_PREFIX,
  PAPER_SHADERS_LICENSE_NAME,
  PAPER_SHADERS_NAME,
} from '../../../src/licenses/consts.ts';
import { THIRD_PARTY_NOTICES } from '../../common/package/consts.ts';
import { sliceArtifactBanner } from './slice-artifact-banner.ts';

const REQUIRED_RUNTIME_BANNER_FRAGMENTS: readonly string[] = Object.freeze([
  'oen-css v',
  'MIT License',
  PAPER_SHADERS_NAME,
  PAPER_SHADERS_LICENSE_NAME,
  PAPER_SHADERS_COPYRIGHT_PREFIX,
  THIRD_PARTY_NOTICES,
]);

export const filterMissingRuntimeBannerFragments = (
  text: string,
): readonly string[] =>
  filter(
    REQUIRED_RUNTIME_BANNER_FRAGMENTS,
    (fragment) => !includes(sliceArtifactBanner(text), fragment),
  );

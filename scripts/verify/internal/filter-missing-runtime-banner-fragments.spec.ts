import { describe, expect, it } from 'vitest';
import { formatOenRuntimeBanner } from '../../../src/banner/format-oen-runtime-banner.ts';
import { filterMissingRuntimeBannerFragments } from './filter-missing-runtime-banner-fragments.ts';

const BANNER = formatOenRuntimeBanner({
  version: '0.2.1',
  homepage: 'https://example.com',
  paperShadersVersion: '0.0.82',
  paperShadersCopyright: 'Copyright 2026 Paper',
});

describe('filterMissingRuntimeBannerFragments', () => {
  it('should return no fragment when the runtime carries its own banner', () => {
    expect(filterMissingRuntimeBannerFragments(`${BANNER}\nvoid 0;`)).toEqual(
      [],
    );
  });

  it('should return every fragment when the runtime carries no banner', () => {
    expect(filterMissingRuntimeBannerFragments('void 0;')).toEqual([
      'oen-css v',
      'MIT License',
      'Paper Shaders',
      'Apache License 2.0',
      'Copyright',
      'THIRD_PARTY_NOTICES.md',
    ]);
  });

  it('should return the shader attribution when the banner names only oen-css', () => {
    expect(
      filterMissingRuntimeBannerFragments(
        '/*!\n * oen-css v0.2.1 | MIT License\n */\nvoid 0;',
      ),
    ).toEqual([
      'Paper Shaders',
      'Apache License 2.0',
      'Copyright',
      'THIRD_PARTY_NOTICES.md',
    ]);
  });
});

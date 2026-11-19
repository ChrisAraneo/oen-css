import { describe, expect, it } from 'vitest';
import { filterMissingBannerFragments } from './filter-missing-banner-fragments.ts';

const COMPLETE_BANNER = `@charset "UTF-8";
/*!
 * oen-css v0.2.1 | MIT License | https://example.com
 * Built from Bulma v1.0.4 | MIT License | https://bulma.io
 * Copyright (c) 2023 Jeremy Thomas
 * Bulma's license is reproduced verbatim in LICENSE-bulma, alongside this file.
 */
body {}`;

describe('filterMissingBannerFragments', () => {
  it('should return an empty array when the banner carries every fragment', () => {
    expect(filterMissingBannerFragments(COMPLETE_BANNER)).toEqual([]);
  });

  it('should return every fragment when the stylesheet has no banner', () => {
    expect(filterMissingBannerFragments('body {}')).toEqual([
      'oen-css v',
      'MIT License',
      'Bulma v',
      'Copyright (c)',
      'LICENSE-bulma',
    ]);
  });

  it('should return `Copyright (c)` when the banner leaves out the copyright line', () => {
    expect(
      filterMissingBannerFragments(
        COMPLETE_BANNER.replace('Copyright (c) 2023 Jeremy Thomas', ''),
      ),
    ).toEqual(['Copyright (c)']);
  });

  it('should return `Bulma v` when it appears outside the banner', () => {
    expect(
      filterMissingBannerFragments('/*! oen-css v0.2.1 */\n/* Bulma v1.0.4 */'),
    ).toContain('Bulma v');
  });

  it('should return `LICENSE-bulma` when the banner leaves it out', () => {
    expect(
      filterMissingBannerFragments(
        COMPLETE_BANNER.replace('LICENSE-bulma', ''),
      ),
    ).toEqual(['LICENSE-bulma']);
  });
});

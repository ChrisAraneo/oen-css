import { describe, expect, it } from 'vitest';
import { filterEmbeddedLicenseComments } from './filter-embedded-license-comments.ts';

describe('filterEmbeddedLicenseComments', () => {
  it('should return the parsed comment when the body carries a license comment', () => {
    expect(
      filterEmbeddedLicenseComments('body {}\n/*! minireset.css v0.0.6 */'),
    ).toEqual([
      {
        text: '/*! minireset.css v0.0.6 */',
        name: 'minireset.css v0.0.6',
        details: [],
      },
    ]);
  });

  it('should return an empty array when the only comment is the leading banner', () => {
    expect(
      filterEmbeddedLicenseComments('/*! oen-css v0.2.1 */\nbody {}'),
    ).toEqual([]);
  });

  it('should return an empty array when the banner follows a charset declaration', () => {
    expect(
      filterEmbeddedLicenseComments(
        '@charset "UTF-8";\n/*! oen-css */\nbody {}',
      ),
    ).toEqual([]);
  });

  it('should return both comments in the order they appear when the body carries two', () => {
    expect(
      filterEmbeddedLicenseComments(
        'body {}\n/*! first */\na {}\n/*! second */',
      ).map(({ name }) => name),
    ).toEqual(['first', 'second']);
  });

  it('should return one comment when the same comment is repeated verbatim', () => {
    expect(
      filterEmbeddedLicenseComments('body {}\n/*! same */\na {}\n/*! same */'),
    ).toHaveLength(1);
  });

  it('should return an empty array when the comment is an ordinary one', () => {
    expect(
      filterEmbeddedLicenseComments('body {}\n/* Bulma Elements */'),
    ).toEqual([]);
  });

  it('should return the name and the details when the comment is pipe separated', () => {
    expect(
      filterEmbeddedLicenseComments('body {}\n/*! pkg v1 | MIT | url */'),
    ).toEqual([
      {
        text: '/*! pkg v1 | MIT | url */',
        name: 'pkg v1',
        details: ['MIT', 'url'],
      },
    ]);
  });

  it('should return an empty array when the stylesheet is empty', () => {
    expect(filterEmbeddedLicenseComments('')).toEqual([]);
  });
});

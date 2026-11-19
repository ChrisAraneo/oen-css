import { describe, expect, it } from 'vitest';
import { toBannerHomepage } from './to-banner-homepage.ts';

const FALLBACK = 'https://github.com/ChrisAraneo/oen-css';

describe('toBannerHomepage', () => {
  it('should return the homepage without the fragment when the homepage ends in `#readme`', () => {
    expect(toBannerHomepage('https://example.com/pkg#readme')).toBe(
      'https://example.com/pkg',
    );
  });

  it('should return the homepage unchanged when it has no fragment', () => {
    expect(toBannerHomepage('https://example.com/pkg')).toBe(
      'https://example.com/pkg',
    );
  });

  it('should return the homepage unchanged when `#readme` is not at the end', () => {
    expect(toBannerHomepage('https://example.com/#readme/docs')).toBe(
      'https://example.com/#readme/docs',
    );
  });

  it('should return the repository URL when the homepage is `undefined`', () => {
    expect(toBannerHomepage(undefined)).toBe(FALLBACK);
  });

  it('should return the repository URL when the homepage is an empty string', () => {
    expect(toBannerHomepage('')).toBe(FALLBACK);
  });

  it('should return the repository URL when the homepage is only `#readme`', () => {
    expect(toBannerHomepage('#readme')).toBe(FALLBACK);
  });
});

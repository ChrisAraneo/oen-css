import { describe, expect, it } from 'vitest';
import { formatOenBanner } from './format-oen-banner.ts';

const FACTS = {
  version: '0.2.1',
  bulmaVersion: '1.0.4',
  bulmaCopyright: 'Copyright (c) 2023 Jeremy Thomas',
  homepage: 'https://github.com/ChrisAraneo/oen-css',
};

describe('formatOenBanner', () => {
  it('should return a banner that starts with `/*!` when called with the facts', () => {
    expect(formatOenBanner(FACTS).startsWith('/*!')).toBe(true);
  });

  it('should return a banner that ends with the comment marker when called with the facts', () => {
    expect(formatOenBanner(FACTS).endsWith(' */')).toBe(true);
  });

  it('should return our version, license, and homepage on one line when called with the facts', () => {
    expect(formatOenBanner(FACTS)).toContain(
      ' * oen-css v0.2.1 | MIT License | https://github.com/ChrisAraneo/oen-css',
    );
  });

  it('should return the Bulma version, license, and homepage when called with the facts', () => {
    expect(formatOenBanner(FACTS)).toContain(
      ' * Built from Bulma v1.0.4 | MIT License | https://bulma.io',
    );
  });

  it('should return the Bulma copyright line as given when called with the facts', () => {
    expect(formatOenBanner(FACTS)).toContain(
      ' * Copyright (c) 2023 Jeremy Thomas',
    );
  });

  it('should return a banner naming `LICENSE-bulma` when called with the facts', () => {
    expect(formatOenBanner(FACTS)).toContain('LICENSE-bulma');
  });

  it('should return the custom property renaming and that classes are unchanged when called with the facts', () => {
    const banner = formatOenBanner(FACTS);

    expect(banner).toContain(
      '`--bulma-*` custom properties are emitted as `--oen-*`',
    );
    expect(banner).toContain('are unchanged');
  });

  it('should return ten lines when called with the facts', () => {
    expect(formatOenBanner(FACTS).split('\n')).toHaveLength(10);
  });

  it('should return the given version and homepage when called with other facts', () => {
    expect(
      formatOenBanner({
        version: '9.9.9',
        bulmaVersion: '2.0.0',
        bulmaCopyright: 'Copyright (c) 1999 Someone',
        homepage: 'https://example.com',
      }),
    ).toContain(' * oen-css v9.9.9 | MIT License | https://example.com');
  });
});

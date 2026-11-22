import { describe, expect, it } from 'vitest';
import { formatOenRuntimeBanner } from './format-oen-runtime-banner.ts';

const FACTS = {
  version: '0.2.1',
  homepage: 'https://example.com',
  paperShadersVersion: '0.0.82',
  paperShadersCopyright: 'Copyright 2026 Paper',
};

describe('formatOenRuntimeBanner', () => {
  it('should return a banner that opens a legal comment when called with the facts', () => {
    expect(formatOenRuntimeBanner(FACTS).startsWith('/*!')).toBe(true);
  });

  it('should return a banner that closes the comment when called with the facts', () => {
    expect(formatOenRuntimeBanner(FACTS).endsWith(' */')).toBe(true);
  });

  it('should return the version and the homepage when called with the facts', () => {
    expect(formatOenRuntimeBanner(FACTS)).toContain(
      'oen-css v0.2.1 | MIT License | https://example.com',
    );
  });

  it('should return the bundled shader and its license when called with the facts', () => {
    expect(formatOenRuntimeBanner(FACTS)).toContain(
      'Bundles Paper Shaders v0.0.82 | Apache License 2.0',
    );
  });

  it('should return the shader copyright line when called with the facts', () => {
    expect(formatOenRuntimeBanner(FACTS)).toContain('Copyright 2026 Paper');
  });

  it('should return where the full notice ships when called with the facts', () => {
    expect(formatOenRuntimeBanner(FACTS)).toContain('THIRD_PARTY_NOTICES.md');
  });

  it('should not return Bulma when called with the facts', () => {
    expect(formatOenRuntimeBanner(FACTS)).not.toContain('Bulma');
  });
});

import { describe, expect, it } from 'vitest';
import { OEN_FONT_STACK } from './consts.ts';
import { toFontConfiguration } from './to-font-configuration.ts';

describe('toFontConfiguration', () => {
  it('should return the `$family-sans-serif` variable alone when the configuration is built', () => {
    expect(toFontConfiguration()).toEqual([
      `$family-sans-serif: (${OEN_FONT_STACK})`,
    ]);
  });

  it('should return the stack wrapped in parentheses when the configuration is built', () => {
    expect(toFontConfiguration()).toEqual([
      expect.stringMatching(/^\$family-sans-serif: \(.*\)$/),
    ]);
  });

  it('should return `Trebuchet MS` quoted when the configuration is built', () => {
    expect(toFontConfiguration().join('')).toContain('"Trebuchet MS"');
  });

  it('should return a stack ending in `sans-serif` when the configuration is built', () => {
    expect(toFontConfiguration().join('')).toContain('sans-serif)');
  });
});

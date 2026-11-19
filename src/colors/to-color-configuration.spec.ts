import { describe, expect, it } from 'vitest';
import { OEN_THEME_COLORS } from './consts.ts';
import { toColorConfiguration } from './to-color-configuration.ts';

describe('toColorConfiguration', () => {
  it('should return one Sass variable per configured theme color when the configuration is built', () => {
    expect(toColorConfiguration()).toHaveLength(OEN_THEME_COLORS.length);
  });

  it('should return each color as a Sass variable assignment when the configuration is built', () => {
    expect(toColorConfiguration()).toEqual(
      OEN_THEME_COLORS.map(({ name, hex }) => `$${name}: ${hex}`),
    );
  });

  it('should return a `$primary` variable with a hex value when the configuration is built', () => {
    expect(toColorConfiguration()).toContainEqual(
      expect.stringMatching(/^\$primary: #[0-9A-Fa-f]{6}$/),
    );
  });

  it('should return a six digit hex value for every color when the configuration is built', () => {
    expect(
      toColorConfiguration().every((variable) =>
        /^\$[a-z]+: #[0-9A-Fa-f]{6}$/.test(variable),
      ),
    ).toBe(true);
  });

  it('should return every entry starting with the `$` sigil when the configuration is built', () => {
    expect(
      toColorConfiguration().every((variable) => variable.startsWith('$')),
    ).toBe(true);
  });

  it('should return no entry ending with a comma when the configuration is built', () => {
    expect(
      toColorConfiguration().every((variable) => !variable.endsWith(',')),
    ).toBe(true);
  });
});

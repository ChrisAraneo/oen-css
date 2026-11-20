import { map } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { OEN_THEME_COLORS } from '../../../src/colors/consts.ts';
import { formatThemeColorDeclaration } from '../../../src/colors/format-theme-color-declaration.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateThemeColors } from './validate-theme-colors.ts';

const EVERY_COLOR = map(OEN_THEME_COLORS, formatThemeColorDeclaration).join(
  '\n',
);

const file = (text: string) => ({
  path: 'oen.css',
  text,
  issue: undefined,
});

const inputs = (stylesheet: string): VerifyInputs => ({
  stylesheet: file(stylesheet),
  minifiedStylesheet: file(''),
  oenLicense: file(''),
  bulmaLicense: file(''),
  thirdPartyNotices: file(''),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
});

describe('validateThemeColors', () => {
  it('should return the check name and the color count when every color compiled', () => {
    const result = validateThemeColors(inputs(EVERY_COLOR));

    expect(result.name).toBe('theme colors are the configured Oen palette');
    expect(result.detail).toBe(
      `${OEN_THEME_COLORS.length} colors compile to their configured values`,
    );
  });

  it('should return `undefined` as the issue when every configured color compiled', () => {
    expect(validateThemeColors(inputs(EVERY_COLOR)).issue).toBe(undefined);
  });

  it('should return the theme issue when the stylesheet carries none of the palette', () => {
    expect(validateThemeColors(inputs('body{}')).issue).toContain(
      'does not carry the theme declared in',
    );
  });

  it('should return the expected `--oen-primary-rgb` declaration when the palette is missing', () => {
    expect(validateThemeColors(inputs('body{}')).issue).toContain(
      '  expected: --oen-primary-rgb:',
    );
  });

  it('should return the missing declaration when one color is absent', () => {
    const missing = formatThemeColorDeclaration(
      OEN_THEME_COLORS[0] ?? { name: 'primary', hex: '#000000' },
    );

    expect(
      validateThemeColors(inputs(EVERY_COLOR.replace(missing, ''))).issue,
    ).toContain(missing);
  });
});

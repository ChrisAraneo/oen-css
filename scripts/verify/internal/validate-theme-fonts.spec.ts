import { map } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { OEN_FONT_PROPERTIES } from '../../../src/fonts/consts.ts';
import { formatThemeFontDeclaration } from '../../../src/fonts/format-theme-font-declaration.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateThemeFonts } from './validate-theme-fonts.ts';

const EVERY_FONT = map(OEN_FONT_PROPERTIES, formatThemeFontDeclaration).join(
  '\n',
);

const file = (text: string) => ({
  path: 'dist/oen.css',
  text,
  issue: undefined,
});

const inputs = (stylesheet: string): VerifyInputs => ({
  stylesheet: file(stylesheet),
  minifiedStylesheet: file(''),
  oenLicense: file(''),
  bulmaLicense: file(''),
  thirdPartyNotices: file(''),
  repositoryOenLicense: file(''),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
});

describe('validateThemeFonts', () => {
  it('should return the check name and the property count when every property compiled', () => {
    const result = validateThemeFonts(inputs(EVERY_FONT));

    expect(result.name).toBe('theme fonts are the configured Oen stack');
    expect(result.detail).toBe(
      `${OEN_FONT_PROPERTIES.length} properties compile to the configured stack`,
    );
  });

  it('should return `undefined` as the issue when every font property compiled', () => {
    expect(validateThemeFonts(inputs(EVERY_FONT)).issue).toBe(undefined);
  });

  it('should return the theme issue when the stylesheet carries none of the stack', () => {
    expect(validateThemeFonts(inputs('body{}')).issue).toContain(
      'does not carry the theme declared in',
    );
  });

  it('should return the expected `--oen-family-primary` declaration when the stack is missing', () => {
    expect(validateThemeFonts(inputs('body{}')).issue).toContain(
      '  expected: --oen-family-primary:',
    );
  });

  it('should return an issue when the stack is quoted in the stylesheet', () => {
    expect(
      validateThemeFonts(inputs(EVERY_FONT.replace(/Trebuchet MS/g, '"x"')))
        .issue,
    ).toContain('expected');
  });
});

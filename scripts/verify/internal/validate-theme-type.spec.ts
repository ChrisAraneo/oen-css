import { map } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { formatThemeTypeDeclaration } from '../../../src/typography/format-theme-type-declaration.ts';
import { OEN_TYPE_DECLARATIONS } from '../../../src/typography/consts.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateThemeType } from './validate-theme-type.ts';

const EVERY_DECLARATION = map(
  OEN_TYPE_DECLARATIONS,
  formatThemeTypeDeclaration,
).join('\n');

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

describe('validateThemeType', () => {
  it('should return the check name and the declaration count when the whole scale compiled', () => {
    const result = validateThemeType(inputs(EVERY_DECLARATION));

    expect(result.name).toBe('type scale is the configured Oen scale');
    expect(result.detail).toBe(
      `${OEN_TYPE_DECLARATIONS.length} declarations compile to their configured sizes`,
    );
  });

  it('should return `undefined` as the issue when the whole scale compiled', () => {
    expect(validateThemeType(inputs(EVERY_DECLARATION)).issue).toBe(undefined);
  });

  it('should return the theme issue when the stylesheet carries none of the scale', () => {
    expect(validateThemeType(inputs('body{}')).issue).toContain(
      'does not carry the theme declared in',
    );
  });

  it('should return the expected `--oen-size-1` declaration when the scale is missing', () => {
    expect(validateThemeType(inputs('body{}')).issue).toContain(
      '  expected: --oen-size-1:',
    );
  });

  it('should return `--oen-size-normal` as missing when the scale is missing', () => {
    expect(validateThemeType(inputs('body{}')).issue).toContain(
      '--oen-size-normal',
    );
  });
});

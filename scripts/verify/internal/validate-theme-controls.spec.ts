import { map } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { OEN_CONTROL_DECLARATIONS } from '../../../src/controls/consts.ts';
import { formatButtonRadiusRule } from '../../../src/controls/format-button-radius-rule.ts';
import { formatThemeControlDeclaration } from '../../../src/controls/format-theme-control-declaration.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateThemeControls } from './validate-theme-controls.ts';

const EVERY_DECLARATION = `${map(
  OEN_CONTROL_DECLARATIONS,
  formatThemeControlDeclaration,
).join('\n')}\n${formatButtonRadiusRule()}`;

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

describe('validateThemeControls', () => {
  it('should return the check name and the declaration count when every metric compiled', () => {
    const result = validateThemeControls(inputs(EVERY_DECLARATION));

    expect(result.name).toBe('controls are the configured Oen metrics');
    expect(result.detail).toBe(
      `${OEN_CONTROL_DECLARATIONS.length} declarations and the button radius rule compile to their configured metrics`,
    );
  });

  it('should return `undefined` as the issue when every metric compiled', () => {
    expect(validateThemeControls(inputs(EVERY_DECLARATION)).issue).toBe(
      undefined,
    );
  });

  it('should return the theme issue when the stylesheet carries none of the metrics', () => {
    expect(validateThemeControls(inputs('body{}')).issue).toContain(
      'does not carry the theme declared in',
    );
  });

  it('should return `--oen-control-line-height` as missing when the metrics are missing', () => {
    expect(validateThemeControls(inputs('body{}')).issue).toContain(
      '--oen-control-line-height',
    );
  });

  it('should return `--oen-button-padding-vertical` as missing when only the line height compiled', () => {
    expect(
      validateThemeControls(inputs('--oen-control-line-height: 1.5714;')).issue,
    ).toContain('--oen-button-padding-vertical');
  });

  it('should return the button radius rule as missing when the stylesheet carries only the declarations', () => {
    expect(
      validateThemeControls(
        inputs(
          map(OEN_CONTROL_DECLARATIONS, formatThemeControlDeclaration).join(
            '\n',
          ),
        ),
      ).issue,
    ).toContain('border-radius');
  });
});

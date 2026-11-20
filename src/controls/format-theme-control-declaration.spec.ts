import { describe, expect, it } from 'vitest';
import { formatThemeControlDeclaration } from './format-theme-control-declaration.ts';

describe('formatThemeControlDeclaration', () => {
  it('should return the prefixed declaration when called with the control line height', () => {
    expect(
      formatThemeControlDeclaration({
        property: 'control-line-height',
        value: '1.5714',
      }),
    ).toBe('--oen-control-line-height: 1.5714;');
  });

  it('should return the prefixed declaration when called with the vertical button padding', () => {
    expect(
      formatThemeControlDeclaration({
        property: 'button-padding-vertical',
        value: '0.6429em',
      }),
    ).toBe('--oen-button-padding-vertical: 0.6429em;');
  });

  it('should return a declaration that ends with a semicolon when called with the horizontal button padding', () => {
    expect(
      formatThemeControlDeclaration({
        property: 'button-padding-horizontal',
        value: '1.4286em',
      }).endsWith(';'),
    ).toBe(true);
  });

  it('should not return the Bulma prefix when called with the control line height', () => {
    expect(
      formatThemeControlDeclaration({
        property: 'control-line-height',
        value: '1.5714',
      }),
    ).not.toContain('--bulma-');
  });
});

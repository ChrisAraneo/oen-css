import { describe, expect, it } from 'vitest';
import { formatThemeTypeDeclaration } from './format-theme-type-declaration.ts';

describe('formatThemeTypeDeclaration', () => {
  it('should return the `--oen-size-1` declaration when called with a scale step', () => {
    expect(
      formatThemeTypeDeclaration({ property: 'size-1', value: '1.75rem' }),
    ).toBe('--oen-size-1: 1.75rem;');
  });

  it('should return the `--oen-size-small` declaration when called with a control size', () => {
    expect(
      formatThemeTypeDeclaration({ property: 'size-small', value: '0.75rem' }),
    ).toBe('--oen-size-small: 0.75rem;');
  });

  it('should return the unitless value as given when called with the line height', () => {
    expect(
      formatThemeTypeDeclaration({
        property: 'body-line-height',
        value: '1.4286',
      }),
    ).toBe('--oen-body-line-height: 1.4286;');
  });

  it('should return a property that starts with `--oen-` when called with a scale step', () => {
    expect(
      formatThemeTypeDeclaration({ property: 'size-6', value: '0.875rem' }),
    ).toMatch(/^--oen-/);
  });

  it('should return a declaration that ends with a semicolon when called with a scale step', () => {
    expect(
      formatThemeTypeDeclaration({ property: 'size-7', value: '0.75rem' }),
    ).toMatch(/;$/);
  });
});

import { describe, expect, it } from 'vitest';
import { formatThemeColorDeclaration } from './format-theme-color-declaration.ts';

describe('formatThemeColorDeclaration', () => {
  it('should return the `-rgb` declaration with three channels when called with a theme color', () => {
    expect(
      formatThemeColorDeclaration({ name: 'primary', hex: '#2DE583' }),
    ).toBe('--oen-primary-rgb: 45, 229, 131;');
  });

  it('should return a property named after the color with an `-rgb` suffix when called with `link`', () => {
    expect(formatThemeColorDeclaration({ name: 'link', hex: '#E52DB4' })).toBe(
      '--oen-link-rgb: 229, 45, 180;',
    );
  });

  it('should return a property that starts with `--oen-` when called with a theme color', () => {
    expect(
      formatThemeColorDeclaration({ name: 'danger', hex: '#E52D2D' }),
    ).toMatch(/^--oen-/);
  });

  it('should return the channels separated by a comma and a space when called with `#000000`', () => {
    expect(
      formatThemeColorDeclaration({ name: 'info', hex: '#000000' }),
    ).toContain('0, 0, 0');
  });

  it('should return a declaration that ends with a semicolon when called with a theme color', () => {
    expect(
      formatThemeColorDeclaration({ name: 'success', hex: '#2DE52D' }),
    ).toMatch(/;$/);
  });
});

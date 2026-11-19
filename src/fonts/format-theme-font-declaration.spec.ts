import { describe, expect, it } from 'vitest';
import { formatThemeFontDeclaration } from './format-theme-font-declaration.ts';

const UNQUOTED_STACK =
  'Trebuchet MS, Seravek, Gill Sans Nova, Segoe UI, Ubuntu, Calibri, Noto Sans, DejaVu Sans, sans-serif';

describe('formatThemeFontDeclaration', () => {
  it('should return the `--oen-family-primary` declaration when called with `family-primary`', () => {
    expect(formatThemeFontDeclaration('family-primary')).toBe(
      `--oen-family-primary: ${UNQUOTED_STACK};`,
    );
  });

  it('should return the `--oen-family-secondary` declaration when called with `family-secondary`', () => {
    expect(formatThemeFontDeclaration('family-secondary')).toBe(
      `--oen-family-secondary: ${UNQUOTED_STACK};`,
    );
  });

  it('should return a declaration with no quotes when called with `family-primary`', () => {
    expect(formatThemeFontDeclaration('family-primary')).not.toContain('"');
  });

  it('should return a declaration ending in `sans-serif;` when called with `family-primary`', () => {
    expect(formatThemeFontDeclaration('family-primary')).toMatch(
      /sans-serif;$/,
    );
  });

  it('should return a property that starts with `--oen-` when called with `family-primary`', () => {
    expect(formatThemeFontDeclaration('family-primary')).toMatch(/^--oen-/);
  });
});

import { describe, expect, it } from 'vitest';
import { isThemedDeclaration } from './is-themed-declaration.ts';

describe('isThemedDeclaration', () => {
  it('should return `true` when the line declares a theme color property', () => {
    expect(isThemedDeclaration('--bulma-primary: red;')).toBe(true);
  });

  it('should return `true` when the line declares a derived channel property', () => {
    expect(isThemedDeclaration('--bulma-primary-rgb: 1, 2, 3;')).toBe(true);
  });

  it('should return `true` when the line declares a theme font property', () => {
    expect(isThemedDeclaration('--bulma-family-primary: sans-serif;')).toBe(
      true,
    );
  });

  it('should return `true` when the line declares a type scale property', () => {
    expect(isThemedDeclaration('--bulma-size-1: 1.75rem;')).toBe(true);
  });

  it('should return `true` when the line declares the control line height', () => {
    expect(isThemedDeclaration('--bulma-control-line-height: 1.5714;')).toBe(
      true,
    );
  });

  it('should return `true` when the line declares a button padding property', () => {
    expect(
      isThemedDeclaration('--bulma-button-padding-horizontal: 1.5714em;'),
    ).toBe(true);
  });

  it('should return `true` when the line declares `font-family` or `font-size`', () => {
    expect(isThemedDeclaration('font-family: sans-serif;')).toBe(true);
    expect(isThemedDeclaration('font-size: 1rem;')).toBe(true);
  });

  it('should return `true` when the declaration is indented', () => {
    expect(isThemedDeclaration('    --bulma-primary: red;')).toBe(true);
  });

  it('should return `false` when the line declares `--bulma-radius`', () => {
    expect(isThemedDeclaration('--bulma-radius: 4px;')).toBe(false);
  });

  it('should return `false` when the line declares `margin`', () => {
    expect(isThemedDeclaration('margin: 0;')).toBe(false);
  });

  it('should return `false` when the line is a selector', () => {
    expect(isThemedDeclaration('.button {')).toBe(false);
  });

  it('should return `false` when the line is `undefined`', () => {
    expect(isThemedDeclaration(undefined)).toBe(false);
  });
});

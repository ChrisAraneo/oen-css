import { describe, expect, it } from 'vitest';
import { OEN_BUTTON_RADIUS } from './consts.ts';
import { formatButtonRadiusRule } from './format-button-radius-rule.ts';

describe('formatButtonRadiusRule', () => {
  it('should return the rule for the button selector when the rule is formatted', () => {
    expect(formatButtonRadiusRule()).toBe(
      '.button {\n  border-radius: 20px;\n}',
    );
  });

  it('should return the configured radius when the rule is formatted', () => {
    expect(formatButtonRadiusRule()).toContain(
      `border-radius: ${OEN_BUTTON_RADIUS};`,
    );
  });

  it('should return a rule that starts with the button selector when the rule is formatted', () => {
    expect(formatButtonRadiusRule().startsWith('.button {')).toBe(true);
  });

  it('should return a rule that ends with the closing brace when the rule is formatted', () => {
    expect(formatButtonRadiusRule().endsWith('}')).toBe(true);
  });

  it('should not return a size modifier selector when the rule is formatted', () => {
    expect(formatButtonRadiusRule()).not.toContain('is-');
  });
});

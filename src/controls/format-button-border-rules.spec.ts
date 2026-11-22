import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_BORDER_OPACITY,
  OEN_BUTTON_BORDER_WIDTH,
} from './consts.ts';
import { formatButtonBorderRules } from './format-button-border-rules.ts';

describe('formatButtonBorderRules', () => {
  it('should return the configured border width for every bordered button when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain(
      `.button:not(.is-ghost):not(.is-text) {\n  --oen-button-border-width: ${OEN_BUTTON_BORDER_WIDTH};\n}`,
    );
  });

  it('should return the translucent rim when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain(
      `border-color: hsla(var(--oen-button-h), var(--oen-button-s), var(--oen-button-color-l), ${OEN_BUTTON_BORDER_OPACITY});`,
    );
  });

  it('should return a single border color declaration when the rules are formatted', () => {
    expect(formatButtonBorderRules().split('border-color:')).toHaveLength(2);
  });

  it('should not return a gradient when the rules are formatted', () => {
    expect(formatButtonBorderRules()).not.toContain('gradient');
  });

  it('should not return a pseudo-element when the rules are formatted', () => {
    expect(formatButtonBorderRules()).not.toContain('::after');
    expect(formatButtonBorderRules()).not.toContain('::before');
  });

  it('should not return a mask when the rules are formatted', () => {
    expect(formatButtonBorderRules()).not.toContain('mask');
  });

  it('should return a rule that ends with the closing brace when the rules are formatted', () => {
    expect(formatButtonBorderRules().endsWith('}')).toBe(true);
  });
});

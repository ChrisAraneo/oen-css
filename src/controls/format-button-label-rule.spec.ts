import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_LETTER_SPACING,
  OEN_BUTTON_TEXT_TRANSFORM,
} from './consts.ts';
import { formatButtonLabelRule } from './format-button-label-rule.ts';

describe('formatButtonLabelRule', () => {
  it('should return the rule for every button when the rule is formatted', () => {
    expect(formatButtonLabelRule()).toBe(
      '.button {\n  letter-spacing: 0.75px;\n  text-transform: uppercase;\n}',
    );
  });

  it('should return the configured letter spacing when the rule is formatted', () => {
    expect(formatButtonLabelRule()).toContain(
      `letter-spacing: ${OEN_BUTTON_LETTER_SPACING};`,
    );
  });

  it('should return the configured text transform when the rule is formatted', () => {
    expect(formatButtonLabelRule()).toContain(
      `text-transform: ${OEN_BUTTON_TEXT_TRANSFORM};`,
    );
  });

  it('should return a rule that starts with the plain button selector when the rule is formatted', () => {
    expect(formatButtonLabelRule().startsWith('.button {')).toBe(true);
  });

  it('should not return a variant selector when the rule is formatted', () => {
    expect(formatButtonLabelRule()).not.toContain('is-');
  });

  it('should return a rule that ends with the closing brace when the rule is formatted', () => {
    expect(formatButtonLabelRule().endsWith('}')).toBe(true);
  });
});

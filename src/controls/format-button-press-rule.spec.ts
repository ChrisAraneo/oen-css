import { describe, expect, it } from 'vitest';
import { OEN_BUTTON_PRESS_DEPTH, OEN_BUTTON_PRESS_REST } from './consts.ts';
import { formatButtonPressRule } from './format-button-press-rule.ts';

describe('formatButtonPressRule', () => {
  it('should return the rule for every button when the rule is formatted', () => {
    expect(formatButtonPressRule()).toBe(
      '.button {\n' +
        '  --oen-button-press: 0;\n' +
        '  --oen-button-press-depth: 0.0714em;\n' +
        '  padding-bottom: calc(var(--oen-button-padding-vertical) - var(--oen-button-border-width) - var(--oen-button-press) * var(--oen-button-press-depth));\n' +
        '  padding-top: calc(var(--oen-button-padding-vertical) - var(--oen-button-border-width) + var(--oen-button-press) * var(--oen-button-press-depth));\n' +
        '}',
    );
  });

  it('should return a button that rests unpressed when the rule is formatted', () => {
    expect(formatButtonPressRule()).toContain(
      `--oen-button-press: ${OEN_BUTTON_PRESS_REST};`,
    );
  });

  it('should return the configured press depth when the rule is formatted', () => {
    expect(formatButtonPressRule()).toContain(
      `--oen-button-press-depth: ${OEN_BUTTON_PRESS_DEPTH};`,
    );
  });

  it('should return a label that moves down when the button is pressed', () => {
    expect(formatButtonPressRule()).toContain(
      'padding-top: calc(var(--oen-button-padding-vertical) - var(--oen-button-border-width) + var(--oen-button-press)',
    );
  });

  it('should return a label that gives back what it takes when the button is pressed', () => {
    expect(formatButtonPressRule()).toContain(
      'padding-bottom: calc(var(--oen-button-padding-vertical) - var(--oen-button-border-width) - var(--oen-button-press)',
    );
  });

  it('should return a rule that starts with the plain button selector when the rule is formatted', () => {
    expect(formatButtonPressRule().startsWith('.button {')).toBe(true);
  });

  it('should not return a variant selector when the rule is formatted', () => {
    expect(formatButtonPressRule()).not.toContain('is-');
  });

  it('should return a rule that ends with the closing brace when the rule is formatted', () => {
    expect(formatButtonPressRule().endsWith('}')).toBe(true);
  });
});

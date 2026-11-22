import { size } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_BORDER_OPACITY,
  OEN_BUTTON_BORDER_WIDTH,
  OEN_BUTTON_GRADIENT_STOPS,
} from './consts.ts';
import { formatButtonBorderRules } from './format-button-border-rules.ts';

describe('formatButtonBorderRules', () => {
  it('should return the configured border width for every bordered button when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain(
      `.button:not(.is-ghost):not(.is-text) {\n  --oen-button-border-width: ${OEN_BUTTON_BORDER_WIDTH};\n}`,
    );
  });

  it('should return the translucent rim as the fallback when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain(
      `border-color: hsla(var(--oen-button-h), var(--oen-button-s), var(--oen-button-color-l), ${OEN_BUTTON_BORDER_OPACITY});`,
    );
  });

  it('should return the gradient ring behind a mask support query when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain(
      '@supports (mask-composite: exclude) or (-webkit-mask-composite: xor) {',
    );
  });

  it('should return one gradient stop for each configured stop when the rules are formatted', () => {
    expect(
      size(formatButtonBorderRules().split('var(--oen-button-background-l)')),
    ).toBe(size(OEN_BUTTON_GRADIENT_STOPS) + 1);
  });

  it('should return a gradient that runs down the button when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain(
      'background-image: linear-gradient(to bottom, ',
    );
  });

  it('should return the lighter stop before the darker one when the rules are formatted', () => {
    const rules = formatButtonBorderRules();

    expect(rules.indexOf('min(var(--oen-button-background-l)')).toBeLessThan(
      rules.indexOf('max(var(--oen-button-background-l)'),
    );
  });

  it('should return no border width for a ringed button when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain(
      '--oen-button-border-width: 0px;',
    );
  });

  it('should return a ring that follows the button radius when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain('border-radius: inherit;');
  });

  it('should return a ring as thick as the configured border when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain(
      `padding: ${OEN_BUTTON_BORDER_WIDTH};`,
    );
  });

  it('should return the mask that cuts the middle out of the ring when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain('mask-composite: exclude;');
  });

  it('should not return the ring on the loading, static or disabled button when the rules are formatted', () => {
    expect(formatButtonBorderRules()).toContain(
      ':not(.is-loading):not(.is-static):not([disabled])',
    );
  });

  it('should return a single border color declaration when the rules are formatted', () => {
    expect(formatButtonBorderRules().split('border-color:')).toHaveLength(2);
  });
});

import { size } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { OEN_BUTTON_SHADOW_LAYERS } from './consts.ts';
import { formatButtonShadowRules } from './format-button-shadow-rules.ts';

describe('formatButtonShadowRules', () => {
  it('should return the rule for every button but the ghost and the text one when the rules are formatted', () => {
    expect(
      formatButtonShadowRules().startsWith(
        '.button:where(:not(.is-ghost, .is-text)) {',
      ),
    ).toBe(true);
  });

  it('should return one shadow for each configured layer when the rules are formatted', () => {
    expect(size(formatButtonShadowRules().split('hsla('))).toBe(
      size(OEN_BUTTON_SHADOW_LAYERS) + 1,
    );
  });

  it('should return a shadow built from the button hue and saturation when the rules are formatted', () => {
    expect(formatButtonShadowRules()).toContain(
      'hsla(var(--oen-button-h), var(--oen-button-s),',
    );
  });

  it('should return the halo before the drop when the rules are formatted', () => {
    const rules = formatButtonShadowRules();

    expect(rules.indexOf('0 0 8px')).toBeLessThan(rules.indexOf('0 8px 24px'));
  });

  it('should return a single box-shadow declaration when the rules are formatted', () => {
    expect(formatButtonShadowRules().split('box-shadow:')).toHaveLength(2);
  });

  it('should return no inset shadow when the rules are formatted', () => {
    expect(formatButtonShadowRules()).not.toContain('inset');
  });

  it('should return a rule that ends with the closing brace when the rules are formatted', () => {
    expect(formatButtonShadowRules().endsWith('}')).toBe(true);
  });
});

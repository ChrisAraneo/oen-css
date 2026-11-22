import { size } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_GLASS_ANIMATION,
  OEN_BUTTON_GLASS_BLUR,
  OEN_BUTTON_GLASS_DURATION,
  OEN_BUTTON_GLASS_LAYERS,
  OEN_BUTTON_GLASS_OPACITY,
  OEN_BUTTON_GLASS_SPREAD,
  OEN_BUTTON_GLASS_STRONG_OPACITY,
} from './consts.ts';
import { formatButtonGlassRules } from './format-button-glass-rules.ts';

describe('formatButtonGlassRules', () => {
  it('should return the keyframes before the rules when the rules are formatted', () => {
    expect(
      formatButtonGlassRules().startsWith(
        `@keyframes ${OEN_BUTTON_GLASS_ANIMATION} {`,
      ),
    ).toBe(true);
  });

  it('should return one radial gradient for each configured layer when the rules are formatted', () => {
    expect(formatButtonGlassRules().split('radial-gradient(')).toHaveLength(
      size(OEN_BUTTON_GLASS_LAYERS) + 1,
    );
  });

  it('should return the gradient on the before pseudo element when the rules are formatted', () => {
    expect(formatButtonGlassRules()).toContain(
      '.button:where(:not(.is-ghost, .is-text))::before {',
    );
  });

  it('should return the layer behind the label when the rules are formatted', () => {
    expect(formatButtonGlassRules()).toContain('z-index: -1;');
  });

  it('should return the stacking context and the clip on the button when the rules are formatted', () => {
    expect(formatButtonGlassRules()).toContain(
      '.button:where(:not(.is-ghost, .is-text)) {\n  isolation: isolate;\n  overflow: hidden;\n}',
    );
  });

  it('should return the configured spread when the rules are formatted', () => {
    expect(formatButtonGlassRules()).toContain(
      `inset: ${OEN_BUTTON_GLASS_SPREAD};`,
    );
  });

  it('should return the configured blur when the rules are formatted', () => {
    expect(formatButtonGlassRules()).toContain(
      `filter: blur(${OEN_BUTTON_GLASS_BLUR});`,
    );
  });

  it('should return the configured opacity when the rules are formatted', () => {
    expect(formatButtonGlassRules()).toContain(
      `opacity: ${OEN_BUTTON_GLASS_OPACITY};`,
    );
  });

  it('should return the configured duration on the animation when the rules are formatted', () => {
    expect(formatButtonGlassRules()).toContain(
      `animation: ${OEN_BUTTON_GLASS_DURATION} linear infinite ${OEN_BUTTON_GLASS_ANIMATION};`,
    );
  });

  it('should return the layer ignoring pointer events when the rules are formatted', () => {
    expect(formatButtonGlassRules()).toContain('pointer-events: none;');
  });

  it('should return the stronger opacity for the saturated variants when the rules are formatted', () => {
    expect(formatButtonGlassRules()).toContain(
      `.button:is(.is-black, .is-dark, .is-primary, .is-link, .is-info, .is-success, .is-warning, .is-danger)::before {
  opacity: ${OEN_BUTTON_GLASS_STRONG_OPACITY};
}`,
    );
  });

  it('should return the stronger opacity after the base opacity when the rules are formatted', () => {
    const rules = formatButtonGlassRules();

    expect(rules.indexOf(`opacity: ${OEN_BUTTON_GLASS_OPACITY};`)).toBeLessThan(
      rules.indexOf(`opacity: ${OEN_BUTTON_GLASS_STRONG_OPACITY};`),
    );
  });

  it('should return the reduced motion query that stops the animation when the rules are formatted', () => {
    expect(formatButtonGlassRules()).toContain(
      '@media (prefers-reduced-motion: reduce) {\n  .button:where(:not(.is-ghost, .is-text))::before {\n    animation: none;\n  }\n}',
    );
  });

  it('should return the reduced motion query last when the rules are formatted', () => {
    expect(formatButtonGlassRules().endsWith('animation: none;\n  }\n}')).toBe(
      true,
    );
  });
});

import { describe, expect, it } from 'vitest';
import { OEN_BUTTON_SHADOW_LIGHTNESS } from '../consts.ts';
import { formatShadowLayer } from './format-shadow-layer.ts';

describe('formatShadowLayer', () => {
  it('should return the offset, the blur and the button color when called with a layer', () => {
    expect(
      formatShadowLayer({ offset: '0 2px', blur: '10px', opacity: 0.08 }),
    ).toBe(
      '0 2px 10px hsla(var(--oen-button-h), var(--oen-button-s), 45%, 0.08)',
    );
  });

  it('should return the shared shadow lightness when called with a layer', () => {
    expect(
      formatShadowLayer({ offset: '0 0', blur: '8px', opacity: 0.12 }),
    ).toContain(`, ${OEN_BUTTON_SHADOW_LIGHTNESS},`);
  });

  it('should return the opacity of the layer when the layer is faint', () => {
    expect(
      formatShadowLayer({ offset: '0 8px', blur: '24px', opacity: 0.06 }),
    ).toContain(', 0.06)');
  });

  it('should return the offset before the blur when called with a layer', () => {
    expect(
      formatShadowLayer({ offset: '0 8px', blur: '24px', opacity: 0.12 }),
    ).toContain('0 8px 24px hsla(');
  });
});

import { describe, expect, it } from 'vitest';
import { OEN_BUTTON_GRADIENT_SHIFT } from '../consts.ts';
import { toButtonGradientTintPalette } from './to-button-gradient-tint-palette.ts';

const PALETTE = { hue: 210, saturation: 71, lightness: 50 };

describe('toButtonGradientTintPalette', () => {
  it('should return the shifted lightness when the stop runs lighter', () => {
    expect(
      toButtonGradientTintPalette(PALETTE, { direction: 'lighter', limit: 93 }),
    ).toEqual({
      hue: 210,
      saturation: 71,
      lightness: 50 + OEN_BUTTON_GRADIENT_SHIFT,
    });
  });

  it('should return the shifted lightness when the stop runs darker', () => {
    expect(
      toButtonGradientTintPalette(PALETTE, { direction: 'darker', limit: 8 }),
    ).toEqual({
      hue: 210,
      saturation: 71,
      lightness: 50 - OEN_BUTTON_GRADIENT_SHIFT,
    });
  });

  it('should return the limit when the lighter shift would pass it', () => {
    expect(
      toButtonGradientTintPalette(
        { hue: 210, saturation: 71, lightness: 100 },
        { direction: 'lighter', limit: 93 },
      ).lightness,
    ).toBe(93);
  });

  it('should return the limit when the darker shift would pass it', () => {
    expect(
      toButtonGradientTintPalette(
        { hue: 210, saturation: 71, lightness: 10 },
        { direction: 'darker', limit: 8 },
      ).lightness,
    ).toBe(8);
  });

  it('should return the given hue and saturation when the stop is applied', () => {
    expect(
      toButtonGradientTintPalette(PALETTE, { direction: 'lighter', limit: 93 }),
    ).toMatchObject({ hue: PALETTE.hue, saturation: PALETTE.saturation });
  });
});

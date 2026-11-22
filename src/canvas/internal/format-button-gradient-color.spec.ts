import { describe, expect, it } from 'vitest';
import { formatButtonGradientColor } from './format-button-gradient-color.ts';

const PALETTE = { hue: 210, saturation: 71, lightness: 53 };

describe('formatButtonGradientColor', () => {
  it('should return an hsla color when the palette is formatted', () => {
    expect(formatButtonGradientColor(PALETTE, 1)).toBe(
      'hsla(210, 71%, 53%, 1)',
    );
  });

  it('should return the given alpha when the palette is formatted', () => {
    expect(formatButtonGradientColor(PALETTE, 0.26)).toBe(
      'hsla(210, 71%, 53%, 0.26)',
    );
  });

  it('should return a transparent color when the alpha is zero', () => {
    expect(formatButtonGradientColor(PALETTE, 0)).toBe(
      'hsla(210, 71%, 53%, 0)',
    );
  });
});

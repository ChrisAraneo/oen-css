import { describe, expect, it } from 'vitest';
import { toButtonPalette } from './to-button-palette.ts';

describe('toButtonPalette', () => {
  it('should return full lightness when the color is white', () => {
    expect(toButtonPalette('rgb(255, 255, 255)')).toEqual({
      hue: 0,
      saturation: 0,
      lightness: 100,
    });
  });

  it('should return no lightness when the color is black', () => {
    expect(toButtonPalette('rgb(0, 0, 0)')).toEqual({
      hue: 0,
      saturation: 0,
      lightness: 0,
    });
  });

  it('should return a saturated mid lightness when the color is pure red', () => {
    expect(toButtonPalette('rgb(255, 0, 0)')).toEqual({
      hue: 0,
      saturation: 100,
      lightness: 50,
    });
  });

  it('should return the hue of the theme blue when the color is that blue', () => {
    expect(toButtonPalette('rgb(0, 102, 204)')?.hue).toBe(210);
  });

  it('should return nothing when the color is fully transparent', () => {
    expect(toButtonPalette('rgba(0, 0, 0, 0)')).toBeUndefined();
  });

  it('should return nothing when the color is partly transparent', () => {
    expect(toButtonPalette('rgba(0, 102, 204, 0.5)')).toBeUndefined();
  });

  it('should return nothing when the color cannot be read', () => {
    expect(toButtonPalette('transparent')).toBeUndefined();
  });
});

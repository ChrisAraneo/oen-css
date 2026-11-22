import { describe, expect, it } from 'vitest';
import { OEN_BUTTON_ACHROMATIC_HUE } from '../consts.ts';
import { toButtonHue } from './to-button-hue.ts';

const OPAQUE = 1;

const toRgb = (red: number, green: number, blue: number) => ({
  red,
  green,
  blue,
  alpha: OPAQUE,
});

describe('toButtonHue', () => {
  it('should return no hue when the color is gray', () => {
    expect(toButtonHue(toRgb(128, 128, 128))).toBe(OEN_BUTTON_ACHROMATIC_HUE);
  });

  it('should return no hue when the color is white', () => {
    expect(toButtonHue(toRgb(255, 255, 255))).toBe(OEN_BUTTON_ACHROMATIC_HUE);
  });

  it('should return zero degrees when the color is red', () => {
    expect(toButtonHue(toRgb(255, 0, 0))).toBe(0);
  });

  it('should return 120 degrees when the color is green', () => {
    expect(toButtonHue(toRgb(0, 255, 0))).toBe(120);
  });

  it('should return 240 degrees when the color is blue', () => {
    expect(toButtonHue(toRgb(0, 0, 255))).toBe(240);
  });

  it('should return 60 degrees when the color is yellow', () => {
    expect(toButtonHue(toRgb(255, 255, 0))).toBe(60);
  });

  it('should return 300 degrees when the color is magenta', () => {
    expect(toButtonHue(toRgb(255, 0, 255))).toBe(300);
  });

  it('should return a hue below one turn when the color sits between magenta and red', () => {
    expect(toButtonHue(toRgb(255, 0, 128))).toBeLessThan(360);
    expect(toButtonHue(toRgb(255, 0, 128))).toBeGreaterThan(300);
  });
});

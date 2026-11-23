import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_LIGHTNESS_CEILING,
  OEN_BUTTON_LIGHTNESS_FLOOR,
} from '../consts.ts';
import type { ButtonPressBand } from '../types/button-press-band.ts';
import { toButtonPressPalette } from './to-button-press-palette.ts';

const PALETTE = { hue: 210, saturation: 71, lightness: 50 };

const LIGHT_PALETTE = { hue: 210, saturation: 71, lightness: 90 };

const toBand = (lightnessShift: number): ButtonPressBand => ({
  side: 'top',
  depth: 0.3,
  lightnessShift,
  alpha: 0.6,
});

describe('toButtonPressPalette', () => {
  it('should return the lightness moved toward the floor when the shift is negative', () => {
    expect(toButtonPressPalette(PALETTE, toBand(-0.6)).lightness).toBe(20);
  });

  it('should return the lightness moved toward the ceiling when the shift is positive', () => {
    expect(toButtonPressPalette(PALETTE, toBand(0.6)).lightness).toBe(80);
  });

  it('should return the same share of the lightness when the button is lighter', () => {
    expect(toButtonPressPalette(LIGHT_PALETTE, toBand(-0.6)).lightness).toBe(
      36,
    );
  });

  it('should return the given lightness when the shift is zero', () => {
    expect(toButtonPressPalette(PALETTE, toBand(0)).lightness).toBe(
      PALETTE.lightness,
    );
  });

  it('should return the floor lightness when the shift reaches the floor', () => {
    expect(toButtonPressPalette(PALETTE, toBand(-1)).lightness).toBe(
      OEN_BUTTON_LIGHTNESS_FLOOR,
    );
  });

  it('should return the ceiling lightness when the shift reaches the ceiling', () => {
    expect(toButtonPressPalette(PALETTE, toBand(1)).lightness).toBe(
      OEN_BUTTON_LIGHTNESS_CEILING,
    );
  });

  it('should return the capped lightness when the shift passes the floor', () => {
    expect(toButtonPressPalette(PALETTE, toBand(-1.4)).lightness).toBe(
      OEN_BUTTON_LIGHTNESS_FLOOR,
    );
  });

  it('should return the given saturation when the band is applied', () => {
    expect(toButtonPressPalette(PALETTE, toBand(-0.6)).saturation).toBe(
      PALETTE.saturation,
    );
  });

  it('should return the given hue when the band is applied', () => {
    expect(toButtonPressPalette(PALETTE, toBand(-0.6)).hue).toBe(PALETTE.hue);
  });
});

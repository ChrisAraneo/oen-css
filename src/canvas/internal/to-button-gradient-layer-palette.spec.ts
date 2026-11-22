import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_GRADIENT_PERCENT,
  OEN_BUTTON_GRADIENT_SATURATION_BOOST,
  OEN_BUTTON_LIGHTNESS_CEILING,
  OEN_BUTTON_LIGHTNESS_FLOOR,
  OEN_BUTTON_SATURATION_CEILING,
} from '../consts.ts';
import { toButtonGradientLayerPalette } from './to-button-gradient-layer-palette.ts';

const PALETTE = { hue: 210, saturation: 20, lightness: 50 };

const toLayer = (lightnessOffset: number) => ({
  lightnessOffset,
  radiusWidth: 86,
  radiusHeight: 112,
  positionLeft: 20,
  positionTop: 26,
  falloff: 72,
});

describe('toButtonGradientLayerPalette', () => {
  it('should return the boosted saturation when the layer is applied', () => {
    expect(toButtonGradientLayerPalette(PALETTE, toLayer(0)).saturation).toBe(
      PALETTE.saturation *
        (1 +
          OEN_BUTTON_GRADIENT_SATURATION_BOOST / OEN_BUTTON_GRADIENT_PERCENT),
    );
  });

  it('should return no saturation when the button has none', () => {
    expect(
      toButtonGradientLayerPalette(
        { hue: 0, saturation: 0, lightness: 100 },
        toLayer(-28),
      ).saturation,
    ).toBe(0);
  });

  it('should return the capped saturation when the boost would pass the ceiling', () => {
    expect(
      toButtonGradientLayerPalette(
        { hue: 210, saturation: 80, lightness: 50 },
        toLayer(0),
      ).saturation,
    ).toBe(OEN_BUTTON_SATURATION_CEILING);
  });

  it('should return the offset lightness when the layer runs lighter', () => {
    expect(toButtonGradientLayerPalette(PALETTE, toLayer(34)).lightness).toBe(
      84,
    );
  });

  it('should return the offset lightness when the layer runs darker', () => {
    expect(toButtonGradientLayerPalette(PALETTE, toLayer(-28)).lightness).toBe(
      22,
    );
  });

  it('should return the capped lightness when the offset would pass the ceiling', () => {
    expect(toButtonGradientLayerPalette(PALETTE, toLayer(80)).lightness).toBe(
      OEN_BUTTON_LIGHTNESS_CEILING,
    );
  });

  it('should return the capped lightness when the offset would pass the floor', () => {
    expect(toButtonGradientLayerPalette(PALETTE, toLayer(-80)).lightness).toBe(
      OEN_BUTTON_LIGHTNESS_FLOOR,
    );
  });

  it('should return the given hue when the layer is applied', () => {
    expect(toButtonGradientLayerPalette(PALETTE, toLayer(0)).hue).toBe(
      PALETTE.hue,
    );
  });
});

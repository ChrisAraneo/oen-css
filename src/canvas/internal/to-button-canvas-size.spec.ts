import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_CANVAS_MAX_PIXELS,
  OEN_BUTTON_CANVAS_MAX_PIXEL_RATIO,
  OEN_BUTTON_CANVAS_MIN_PIXELS,
} from '../consts.ts';
import { toButtonCanvasSize } from './to-button-canvas-size.ts';

describe('toButtonCanvasSize', () => {
  it('should return the css size when the pixel ratio is 1', () => {
    expect(toButtonCanvasSize(86, 40, 1)).toEqual({ width: 86, height: 40 });
  });

  it('should return twice the css size when the pixel ratio is 2', () => {
    expect(toButtonCanvasSize(86, 40, 2)).toEqual({ width: 172, height: 80 });
  });

  it('should return the rounded size when the pixel ratio gives a fraction', () => {
    expect(toButtonCanvasSize(86, 40, 1.5)).toEqual({ width: 129, height: 60 });
  });

  it('should return the capped size when the pixel ratio is above the maximum', () => {
    expect(toButtonCanvasSize(86, 40, 4)).toEqual(
      toButtonCanvasSize(86, 40, OEN_BUTTON_CANVAS_MAX_PIXEL_RATIO),
    );
  });

  it('should return the css size when the pixel ratio is below 1', () => {
    expect(toButtonCanvasSize(86, 40, 0.5)).toEqual({ width: 86, height: 40 });
  });

  it('should return the css size when the pixel ratio is `NaN`', () => {
    expect(toButtonCanvasSize(86, 40, Number.NaN)).toEqual({
      width: 86,
      height: 40,
    });
  });

  it('should return the smallest backing store when the button measures zero', () => {
    expect(toButtonCanvasSize(0, 0, 2)).toEqual({
      width: OEN_BUTTON_CANVAS_MIN_PIXELS,
      height: OEN_BUTTON_CANVAS_MIN_PIXELS,
    });
  });

  it('should return the largest backing store when the button is wider than the cap', () => {
    expect(toButtonCanvasSize(20000, 40, 2).width).toBe(
      OEN_BUTTON_CANVAS_MAX_PIXELS,
    );
  });
});

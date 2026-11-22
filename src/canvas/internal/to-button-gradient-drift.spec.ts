import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_GRADIENT_DRIFT_LEFT,
  OEN_BUTTON_GRADIENT_DRIFT_TOP,
  OEN_BUTTON_GRADIENT_TURN,
  OEN_BUTTON_GRADIENT_ZOOM_FROM,
  OEN_BUTTON_GRADIENT_ZOOM_TO,
} from '../consts.ts';
import { toButtonGradientDrift } from './to-button-gradient-drift.ts';

describe('toButtonGradientDrift', () => {
  it('should return the near corner when the phase is at the start', () => {
    expect(toButtonGradientDrift(0)).toEqual({
      left: -OEN_BUTTON_GRADIENT_DRIFT_LEFT,
      top: -OEN_BUTTON_GRADIENT_DRIFT_TOP,
      turn: 0,
      zoom: OEN_BUTTON_GRADIENT_ZOOM_FROM,
    });
  });

  it('should return the far corner when the phase is halfway', () => {
    expect(toButtonGradientDrift(0.5)).toEqual({
      left: OEN_BUTTON_GRADIENT_DRIFT_LEFT,
      top: OEN_BUTTON_GRADIENT_DRIFT_TOP,
      turn: OEN_BUTTON_GRADIENT_TURN / 2,
      zoom: OEN_BUTTON_GRADIENT_ZOOM_TO,
    });
  });

  it('should return the near corner again when the phase closes the loop', () => {
    expect(toButtonGradientDrift(1)).toEqual({
      left: -OEN_BUTTON_GRADIENT_DRIFT_LEFT,
      top: -OEN_BUTTON_GRADIENT_DRIFT_TOP,
      turn: OEN_BUTTON_GRADIENT_TURN,
      zoom: OEN_BUTTON_GRADIENT_ZOOM_FROM,
    });
  });

  it('should return the midpoint of the sway when the phase is a quarter in', () => {
    expect(toButtonGradientDrift(0.25).left).toBe(0);
    expect(toButtonGradientDrift(0.25).top).toBe(0);
  });

  it('should return a turn that grows with the phase when the phase advances', () => {
    expect(toButtonGradientDrift(0.75).turn).toBeGreaterThan(
      toButtonGradientDrift(0.25).turn,
    );
  });

  it('should return the same sway on both sides of the halfway point when the phase is mirrored', () => {
    expect(toButtonGradientDrift(0.25).zoom).toBe(
      toButtonGradientDrift(0.75).zoom,
    );
  });
});

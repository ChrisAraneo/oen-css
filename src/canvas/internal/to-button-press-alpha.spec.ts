import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_PRESS_FULL_PROGRESS,
  OEN_BUTTON_PRESS_NO_PROGRESS,
} from '../consts.ts';
import type { ButtonPressBand } from '../types/button-press-band.ts';
import { toButtonPressAlpha } from './to-button-press-alpha.ts';

const BAND_ALPHA = 0.6;

const HALF = 0.5;

const BAND: ButtonPressBand = {
  side: 'top',
  depth: 0.3,
  lightnessShift: -0.76,
  alpha: BAND_ALPHA,
};

describe('toButtonPressAlpha', () => {
  it('should return the whole band alpha when the press is complete', () => {
    expect(toButtonPressAlpha(BAND, OEN_BUTTON_PRESS_FULL_PROGRESS)).toBe(
      BAND_ALPHA,
    );
  });

  it('should return no alpha when the press has not started', () => {
    expect(toButtonPressAlpha(BAND, OEN_BUTTON_PRESS_NO_PROGRESS)).toBe(
      OEN_BUTTON_PRESS_NO_PROGRESS,
    );
  });

  it('should return more than half the band alpha when the press is half way', () => {
    expect(toButtonPressAlpha(BAND, HALF)).toBeGreaterThan(BAND_ALPHA * HALF);
  });

  it('should return three quarters of the band alpha when the press is half way', () => {
    expect(toButtonPressAlpha(BAND, HALF)).toBe(BAND_ALPHA * 0.75);
  });

  it('should return a rising alpha when the press grows', () => {
    expect(toButtonPressAlpha(BAND, 0.8)).toBeGreaterThan(
      toButtonPressAlpha(BAND, 0.2),
    );
  });
});

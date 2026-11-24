import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_PRESS_FULL_PROGRESS,
  OEN_BUTTON_PRESS_NO_PROGRESS,
} from '../consts.ts';
import { toButtonPressStrength } from './to-button-press-strength.ts';

const HALF = 0.5;

describe('toButtonPressStrength', () => {
  it('should return full strength when the press is complete', () => {
    expect(toButtonPressStrength(OEN_BUTTON_PRESS_FULL_PROGRESS)).toBe(
      OEN_BUTTON_PRESS_FULL_PROGRESS,
    );
  });

  it('should return no strength when the press has not started', () => {
    expect(toButtonPressStrength(OEN_BUTTON_PRESS_NO_PROGRESS)).toBe(
      OEN_BUTTON_PRESS_NO_PROGRESS,
    );
  });

  it('should return three quarters of the strength when the press is half way', () => {
    expect(toButtonPressStrength(HALF)).toBe(0.75);
  });

  it('should return more strength than the press it was given when the press is partial', () => {
    expect(toButtonPressStrength(0.2)).toBeGreaterThan(0.2);
  });

  it('should return a rising strength when the press grows', () => {
    expect(toButtonPressStrength(0.8)).toBeGreaterThan(
      toButtonPressStrength(0.2),
    );
  });
});

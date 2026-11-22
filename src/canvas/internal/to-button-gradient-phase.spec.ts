import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_GRADIENT_DURATION,
  OEN_BUTTON_GRADIENT_STILL_PHASE,
} from '../consts.ts';
import { toButtonGradientPhase } from './to-button-gradient-phase.ts';

const MOVING = false;

const STILL = true;

describe('toButtonGradientPhase', () => {
  it('should return the start of the loop when no time has passed', () => {
    expect(toButtonGradientPhase(0, MOVING)).toBe(0);
  });

  it('should return the middle of the loop when half the duration has passed', () => {
    expect(
      toButtonGradientPhase(OEN_BUTTON_GRADIENT_DURATION / 2, MOVING),
    ).toBe(0.5);
  });

  it('should return the start of the loop when the whole duration has passed', () => {
    expect(toButtonGradientPhase(OEN_BUTTON_GRADIENT_DURATION, MOVING)).toBe(0);
  });

  it('should return the same phase when a later loop reaches the same point', () => {
    expect(
      toButtonGradientPhase(OEN_BUTTON_GRADIENT_DURATION * 3.25, MOVING),
    ).toBe(toButtonGradientPhase(OEN_BUTTON_GRADIENT_DURATION * 0.25, MOVING));
  });

  it('should return the still phase when motion is not wanted', () => {
    expect(toButtonGradientPhase(OEN_BUTTON_GRADIENT_DURATION / 2, STILL)).toBe(
      OEN_BUTTON_GRADIENT_STILL_PHASE,
    );
  });

  it('should return the start of the loop when the time is `NaN`', () => {
    expect(toButtonGradientPhase(Number.NaN, MOVING)).toBe(0);
  });
});

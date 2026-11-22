import { describe, expect, it } from 'vitest';
import { toButtonGradientOffsetPhase } from './to-button-gradient-offset-phase.ts';

describe('toButtonGradientOffsetPhase', () => {
  it('should return the phase when the offset is the first offset', () => {
    expect(toButtonGradientOffsetPhase(0.25, 0)).toBe(0.25);
  });

  it('should return the shifted phase when the offset fits in the cycle', () => {
    expect(toButtonGradientOffsetPhase(0.5, 0.25)).toBe(0.75);
  });

  it('should return the wrapped phase when the offset reaches past the cycle', () => {
    expect(toButtonGradientOffsetPhase(0.75, 0.5)).toBe(0.25);
  });

  it('should return the first phase when the phase and the offset make one whole cycle', () => {
    expect(toButtonGradientOffsetPhase(0.5, 0.5)).toBe(0);
  });

  it('should return the phase when the offset is one whole cycle', () => {
    expect(toButtonGradientOffsetPhase(0.25, 1)).toBe(0.25);
  });

  it('should return the offset when the phase is held still', () => {
    expect(toButtonGradientOffsetPhase(0, 0.625)).toBe(0.625);
  });
});

import { describe, expect, it } from 'vitest';
import { toButtonMetalOffsetFrame } from './to-button-metal-offset-frame.ts';

describe('toButtonMetalOffsetFrame', () => {
  it('should return the frame when the offset is the first offset', () => {
    expect(toButtonMetalOffsetFrame(1000, 0)).toBe(1000);
  });

  it('should return the frame one step later when the offset is one step', () => {
    expect(toButtonMetalOffsetFrame(0, 0.0625)).toBe(3000);
  });

  it('should return the frame half a spread later when the offset is half the cycle', () => {
    expect(toButtonMetalOffsetFrame(0, 0.5)).toBe(24000);
  });

  it('should return the frame a whole spread later when the offset is a whole cycle', () => {
    expect(toButtonMetalOffsetFrame(1000, 1)).toBe(49000);
  });

  it('should return a frame that keeps the elapsed time when an offset is applied', () => {
    expect(toButtonMetalOffsetFrame(5000, 0.25)).toBe(17000);
  });
});

import { describe, expect, it } from 'vitest';
import { toButtonMetalFrame } from './to-button-metal-frame.ts';

const MOVING = false;

const STILL = true;

describe('toButtonMetalFrame', () => {
  it('should return the first frame when no time has passed', () => {
    expect(toButtonMetalFrame(0, MOVING)).toBe(0);
  });

  it('should return the frame for the elapsed time when motion is allowed', () => {
    expect(toButtonMetalFrame(10000, MOVING)).toBe(1000);
  });

  it('should return a later frame when more time has passed', () => {
    expect(toButtonMetalFrame(20000, MOVING)).toBe(2000);
  });

  it('should return the still frame when motion is reduced', () => {
    expect(toButtonMetalFrame(20000, STILL)).toBe(0);
  });

  it('should return the first frame when the time is not a number', () => {
    expect(toButtonMetalFrame(Number.NaN, MOVING)).toBe(0);
  });
});

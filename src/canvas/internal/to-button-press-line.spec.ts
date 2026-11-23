import { describe, expect, it } from 'vitest';
import type { ButtonPressBand } from '../types/button-press-band.ts';
import type { ButtonPressSide } from '../types/button-press-side.ts';
import { toButtonPressLine } from './to-button-press-line.ts';

const SIZE = { width: 172, height: 80 };

const TALL_SIZE = { width: 80, height: 172 };

const toBand = (side: ButtonPressSide, depth: number): ButtonPressBand => ({
  side,
  depth,
  lightnessShift: -0.55,
  alpha: 0.42,
});

describe('toButtonPressLine', () => {
  it('should return a line that runs down from the top edge when the band sits on the top side', () => {
    expect(toButtonPressLine(SIZE, toBand('top', 0.25))).toEqual({
      startLeft: 0,
      startTop: 0,
      endLeft: 0,
      endTop: 20,
    });
  });

  it('should return a line that runs up from the bottom edge when the band sits on the bottom side', () => {
    expect(toButtonPressLine(SIZE, toBand('bottom', 0.25))).toEqual({
      startLeft: 0,
      startTop: 80,
      endLeft: 0,
      endTop: 60,
    });
  });

  it('should return a line that runs right from the left edge when the band sits on the left side', () => {
    expect(toButtonPressLine(SIZE, toBand('left', 0.25))).toEqual({
      startLeft: 0,
      startTop: 0,
      endLeft: 20,
      endTop: 0,
    });
  });

  it('should return a line that runs left from the right edge when the band sits on the right side', () => {
    expect(toButtonPressLine(SIZE, toBand('right', 0.25))).toEqual({
      startLeft: 172,
      startTop: 0,
      endLeft: 152,
      endTop: 0,
    });
  });

  it('should return a line measured from the height when the canvas is wider than it is tall', () => {
    expect(toButtonPressLine(SIZE, toBand('top', 1)).endTop).toBe(SIZE.height);
  });

  it('should return a line measured from the width when the canvas is taller than it is wide', () => {
    expect(toButtonPressLine(TALL_SIZE, toBand('top', 1)).endTop).toBe(
      TALL_SIZE.width,
    );
  });

  it('should return a line of no length when the band has no depth', () => {
    expect(toButtonPressLine(SIZE, toBand('top', 0))).toEqual({
      startLeft: 0,
      startTop: 0,
      endLeft: 0,
      endTop: 0,
    });
  });
});

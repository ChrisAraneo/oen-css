import { describe, expect, it } from 'vitest';
import { isButtonCanvasSized } from './is-button-canvas-sized.ts';

const SIZE = { width: 172, height: 80 };

describe('isButtonCanvasSized', () => {
  it('should return `true` when both lengths match the wanted size', () => {
    expect(isButtonCanvasSized(172, 80, SIZE)).toBe(true);
  });

  it('should return `false` when the width differs from the wanted size', () => {
    expect(isButtonCanvasSized(171, 80, SIZE)).toBe(false);
  });

  it('should return `false` when the height differs from the wanted size', () => {
    expect(isButtonCanvasSized(172, 81, SIZE)).toBe(false);
  });

  it('should return `false` when the canvas has no backing store yet', () => {
    expect(isButtonCanvasSized(0, 0, SIZE)).toBe(false);
  });

  it('should return `true` when the wanted size is the smallest backing store', () => {
    expect(isButtonCanvasSized(1, 1, { width: 1, height: 1 })).toBe(true);
  });
});

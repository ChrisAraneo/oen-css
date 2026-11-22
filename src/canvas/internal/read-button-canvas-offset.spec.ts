import { describe, expect, it } from 'vitest';
import { readButtonCanvasOffset } from './read-button-canvas-offset.ts';

const toCanvas = (offset: string | null): HTMLCanvasElement =>
  ({
    getAttribute: (): string | null => offset,
  }) as unknown as HTMLCanvasElement;

describe('readButtonCanvasOffset', () => {
  it('should return the stored offset when the canvas carries one', () => {
    expect(readButtonCanvasOffset(toCanvas('0.375'))).toBe(0.375);
  });

  it('should return the first offset when the canvas carries the first offset', () => {
    expect(readButtonCanvasOffset(toCanvas('0'))).toBe(0);
  });

  it('should return the first offset when the canvas carries no offset', () => {
    expect(readButtonCanvasOffset(toCanvas(null))).toBe(0);
  });

  it('should return the first offset when the stored offset is not a number', () => {
    expect(readButtonCanvasOffset(toCanvas('halfway'))).toBe(0);
  });

  it('should return the first offset when the stored offset is empty', () => {
    expect(readButtonCanvasOffset(toCanvas(''))).toBe(0);
  });
});

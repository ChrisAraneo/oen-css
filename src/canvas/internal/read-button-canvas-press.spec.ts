import { describe, expect, it } from 'vitest';
import { OEN_BUTTON_PRESS_NO_PROGRESS } from '../consts.ts';
import { readButtonCanvasPress } from './read-button-canvas-press.ts';

const toCanvas = (press: string | null): HTMLCanvasElement =>
  ({
    getAttribute: (): string | null => press,
  }) as unknown as HTMLCanvasElement;

describe('readButtonCanvasPress', () => {
  it('should return the stored press when the canvas carries one', () => {
    expect(readButtonCanvasPress(toCanvas('0.25'))).toBe(0.25);
  });

  it('should return no progress when the canvas carries no press', () => {
    expect(readButtonCanvasPress(toCanvas(null))).toBe(
      OEN_BUTTON_PRESS_NO_PROGRESS,
    );
  });

  it('should return no progress when the stored press is not a number', () => {
    expect(readButtonCanvasPress(toCanvas('halfway'))).toBe(
      OEN_BUTTON_PRESS_NO_PROGRESS,
    );
  });

  it('should return no progress when the stored press is empty', () => {
    expect(readButtonCanvasPress(toCanvas(''))).toBe(
      OEN_BUTTON_PRESS_NO_PROGRESS,
    );
  });
});

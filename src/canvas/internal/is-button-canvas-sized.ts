import { eq } from 'lodash-es';
import type { ButtonCanvasSize } from '../types/button-canvas-size.ts';

export const isButtonCanvasSized = (
  canvasWidth: number,
  canvasHeight: number,
  { width, height }: ButtonCanvasSize,
): boolean => eq(canvasWidth, width) && eq(canvasHeight, height);

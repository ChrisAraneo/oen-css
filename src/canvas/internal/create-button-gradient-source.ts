import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_GRADIENT_SOURCE_HEIGHT,
  OEN_BUTTON_GRADIENT_SOURCE_WIDTH,
} from '../consts.ts';

export const createButtonGradientSource = (
  document: Document,
): HTMLCanvasElement =>
  pipe(
    document.createElement('canvas'),
    (canvas) =>
      runEffect(
        canvas,
        () => (canvas.width = OEN_BUTTON_GRADIENT_SOURCE_WIDTH),
      ),
    (canvas) =>
      runEffect(
        canvas,
        () => (canvas.height = OEN_BUTTON_GRADIENT_SOURCE_HEIGHT),
      ),
  );

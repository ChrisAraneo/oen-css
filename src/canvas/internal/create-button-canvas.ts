import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_CANVAS_CLASS,
  OEN_BUTTON_CANVAS_HIDDEN_ATTRIBUTE,
} from '../consts.ts';

export const createButtonCanvas = (document: Document): HTMLCanvasElement =>
  pipe(
    document.createElement('canvas'),
    (canvas) =>
      runEffect(canvas, () => (canvas.className = OEN_BUTTON_CANVAS_CLASS)),
    (canvas) =>
      runEffect(canvas, () =>
        canvas.setAttribute(OEN_BUTTON_CANVAS_HIDDEN_ATTRIBUTE, 'true'),
      ),
  );

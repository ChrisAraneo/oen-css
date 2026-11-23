import { pipe } from 'remeda';
import type { BrowserView } from '../types/browser-view.ts';
import type { ButtonCanvasPainter } from '../types/button-canvas-painter.ts';
import { isButtonGradientStill } from './is-button-gradient-still.ts';
import { redrawEveryButtonCanvas } from './redraw-every-button-canvas.ts';
import { toButtonGradientPhase } from './to-button-gradient-phase.ts';
import { toButtonMetalFrame } from './to-button-metal-frame.ts';
import { toButtonPressElapsed } from './to-button-press-elapsed.ts';

export const runButtonCanvasFrame = (
  view: BrowserView,
  painter: ButtonCanvasPainter,
  time: number,
  last: number,
): number =>
  pipe(
    isButtonGradientStill(view),
    (still) =>
      redrawEveryButtonCanvas(
        view,
        painter,
        toButtonGradientPhase(time, still),
        toButtonMetalFrame(time, still),
        toButtonPressElapsed(time, last, still),
      ),
    () =>
      view.requestAnimationFrame((next) =>
        runButtonCanvasFrame(view, painter, next, time),
      ),
  );

import { pipe } from 'remeda';
import { createButtonGradientSource } from './internal/create-button-gradient-source.ts';
import { runButtonCanvasFrame } from './internal/run-button-canvas-frame.ts';
import { startButtonMetal } from './internal/start-button-metal.ts';
import type { BrowserView } from './types/browser-view.ts';

export const startButtonCanvasPaint = (view: BrowserView): number =>
  pipe(
    {
      source: createButtonGradientSource(view.document),
      metal: startButtonMetal(view),
    },
    (painter) =>
      view.requestAnimationFrame((time) =>
        runButtonCanvasFrame(view, painter, time, time),
      ),
  );

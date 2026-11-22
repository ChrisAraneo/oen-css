import { pipe } from 'remeda';
import { runEffect } from '../common/run-effect.ts';
import { addEveryButtonCanvas } from './internal/add-every-button-canvas.ts';
import { watchButtonCanvasHosts } from './internal/watch-button-canvas-hosts.ts';
import { watchButtonCanvasSizes } from './internal/watch-button-canvas-sizes.ts';
import { startButtonCanvasPaint } from './start-button-canvas-paint.ts';
import type { BrowserView } from './types/browser-view.ts';

export const startButtonCanvasRuntime = (view: BrowserView): ResizeObserver =>
  pipe(
    watchButtonCanvasSizes(view),
    (sizes) => runEffect(sizes, () => addEveryButtonCanvas(view, sizes)),
    (sizes) => runEffect(sizes, () => watchButtonCanvasHosts(view, sizes)),
    (sizes) => runEffect(sizes, () => startButtonCanvasPaint(view)),
  );

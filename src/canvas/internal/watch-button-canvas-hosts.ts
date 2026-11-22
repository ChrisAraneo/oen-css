import { OEN_BUTTON_CANVAS_HOST_MUTATIONS } from '../consts.ts';
import type { BrowserView } from '../types/browser-view.ts';
import { addEveryButtonCanvas } from './add-every-button-canvas.ts';

export const watchButtonCanvasHosts = (
  view: BrowserView,
  sizes: ResizeObserver,
): void =>
  new view.MutationObserver(() => addEveryButtonCanvas(view, sizes)).observe(
    view.document,
    OEN_BUTTON_CANVAS_HOST_MUTATIONS,
  );

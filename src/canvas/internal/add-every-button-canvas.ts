import { map } from 'lodash-es';
import type { BrowserView } from '../types/browser-view.ts';
import { addButtonCanvas } from './add-button-canvas.ts';
import { findButtonCanvasHosts } from './find-button-canvas-hosts.ts';

export const addEveryButtonCanvas = (
  view: BrowserView,
  sizes: ResizeObserver,
): readonly HTMLCanvasElement[] =>
  map(findButtonCanvasHosts(view.document), (host) =>
    addButtonCanvas(view, sizes, host),
  );

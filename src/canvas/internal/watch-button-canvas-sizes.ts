import { forEach } from 'lodash-es';
import { match, P } from 'ts-pattern';
import { OEN_BUTTON_CANVAS_CHILD_SELECTOR } from '../consts.ts';
import type { BrowserView } from '../types/browser-view.ts';
import { writeButtonCanvasSize } from './write-button-canvas-size.ts';

const { nullish } = P;

const writeHostCanvasSize = (
  view: BrowserView,
  host: Element,
): HTMLCanvasElement | undefined =>
  match(host.querySelector<HTMLCanvasElement>(OEN_BUTTON_CANVAS_CHILD_SELECTOR))
    .with(nullish, () => undefined)
    .otherwise((canvas) => writeButtonCanvasSize(view, host, canvas));

export const watchButtonCanvasSizes = (view: BrowserView): ResizeObserver =>
  new view.ResizeObserver((entries) =>
    forEach(entries, (entry) => writeHostCanvasSize(view, entry.target)),
  );

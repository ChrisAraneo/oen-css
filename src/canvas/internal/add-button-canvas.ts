import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_CANVAS_CHILD_SELECTOR,
  OEN_BUTTON_CANVAS_MOUNT_EVENT,
} from '../consts.ts';
import type { BrowserView } from '../types/browser-view.ts';
import { createButtonCanvas } from './create-button-canvas.ts';
import { writeButtonCanvasSize } from './write-button-canvas-size.ts';

const { nullish } = P;

const mountButtonCanvas = (
  view: BrowserView,
  sizes: ResizeObserver,
  host: Element,
): HTMLCanvasElement =>
  pipe(
    host.insertBefore(createButtonCanvas(view.document), host.firstChild),
    (canvas) =>
      runEffect(canvas, () => writeButtonCanvasSize(view, host, canvas)),
    (canvas) => runEffect(canvas, () => sizes.observe(host)),
    (canvas) =>
      runEffect(canvas, () =>
        canvas.dispatchEvent(
          new view.CustomEvent(OEN_BUTTON_CANVAS_MOUNT_EVENT, {
            bubbles: true,
          }),
        ),
      ),
  );

export const addButtonCanvas = (
  view: BrowserView,
  sizes: ResizeObserver,
  host: Element,
): HTMLCanvasElement =>
  match(host.querySelector<HTMLCanvasElement>(OEN_BUTTON_CANVAS_CHILD_SELECTOR))
    .with(nullish, () => mountButtonCanvas(view, sizes, host))
    .otherwise((canvas) => canvas);

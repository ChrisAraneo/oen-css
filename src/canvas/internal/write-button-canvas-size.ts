import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import { OEN_BUTTON_CANVAS_RESIZE_EVENT } from '../consts.ts';
import type { BrowserView } from '../types/browser-view.ts';
import type { ButtonCanvasSize } from '../types/button-canvas-size.ts';
import { isButtonCanvasSized } from './is-button-canvas-sized.ts';
import { toButtonCanvasSize } from './to-button-canvas-size.ts';

const writeSize = (
  canvas: HTMLCanvasElement,
  { width, height }: ButtonCanvasSize,
): HTMLCanvasElement =>
  pipe(
    canvas,
    (canvas) => runEffect(canvas, () => (canvas.width = width)),
    (canvas) => runEffect(canvas, () => (canvas.height = height)),
  );

const emitResize = (
  view: BrowserView,
  canvas: HTMLCanvasElement,
): HTMLCanvasElement =>
  runEffect(canvas, () =>
    canvas.dispatchEvent(
      new view.CustomEvent(OEN_BUTTON_CANVAS_RESIZE_EVENT, { bubbles: true }),
    ),
  );

export const writeButtonCanvasSize = (
  view: BrowserView,
  host: Element,
  canvas: HTMLCanvasElement,
): HTMLCanvasElement | undefined =>
  match(
    toButtonCanvasSize(
      host.clientWidth,
      host.clientHeight,
      view.devicePixelRatio,
    ),
  )
    .when(
      (size) => isButtonCanvasSized(canvas.width, canvas.height, size),
      () => undefined,
    )
    .otherwise((size) => emitResize(view, writeSize(canvas, size)));

import { compact, map } from 'lodash-es';
import { match, P } from 'ts-pattern';
import { OEN_BUTTON_CANVAS_CHILD_SELECTOR } from '../consts.ts';
import type { BrowserView } from '../types/browser-view.ts';
import type { ButtonCanvasPaint } from '../types/button-canvas-paint.ts';
import { findButtonCanvasHosts } from './find-button-canvas-hosts.ts';
import { isButtonPressed } from './is-button-pressed.ts';
import { nextButtonCanvasPress } from './next-button-canvas-press.ts';
import { readButtonCanvasOffset } from './read-button-canvas-offset.ts';
import { readButtonPalette } from './read-button-palette.ts';

const { nullish } = P;

const toButtonCanvasPaint = (
  view: BrowserView,
  host: Element,
  elapsed: number,
): ButtonCanvasPaint | undefined =>
  match(host.querySelector<HTMLCanvasElement>(OEN_BUTTON_CANVAS_CHILD_SELECTOR))
    .with(nullish, () => undefined)
    .otherwise((canvas) => ({
      canvas,
      palette: readButtonPalette(view, host),
      offset: readButtonCanvasOffset(canvas),
      press: nextButtonCanvasPress(canvas, isButtonPressed(host), elapsed),
    }));

export const findButtonCanvasPaints = (
  view: BrowserView,
  elapsed: number,
): readonly ButtonCanvasPaint[] =>
  compact(
    map(findButtonCanvasHosts(view.document), (host) =>
      toButtonCanvasPaint(view, host, elapsed),
    ),
  );

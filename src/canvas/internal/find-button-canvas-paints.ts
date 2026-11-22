import { compact, map } from 'lodash-es';
import { match, P } from 'ts-pattern';
import { OEN_BUTTON_CANVAS_CHILD_SELECTOR } from '../consts.ts';
import type { BrowserView } from '../types/browser-view.ts';
import type { ButtonCanvasPaint } from '../types/button-canvas-paint.ts';
import { findButtonCanvasHosts } from './find-button-canvas-hosts.ts';
import { readButtonPalette } from './read-button-palette.ts';

const { nullish } = P;

const toButtonCanvasPaint = (
  view: BrowserView,
  host: Element,
): ButtonCanvasPaint | undefined =>
  match(host.querySelector<HTMLCanvasElement>(OEN_BUTTON_CANVAS_CHILD_SELECTOR))
    .with(nullish, () => undefined)
    .otherwise((canvas) => ({
      canvas,
      palette: readButtonPalette(view, host),
    }));

export const findButtonCanvasPaints = (
  view: BrowserView,
): readonly ButtonCanvasPaint[] =>
  compact(
    map(findButtonCanvasHosts(view.document), (host) =>
      toButtonCanvasPaint(view, host),
    ),
  );

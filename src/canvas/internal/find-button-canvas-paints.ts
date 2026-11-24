import { compact, map } from 'lodash-es';
import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import { OEN_BUTTON_CANVAS_CHILD_SELECTOR } from '../consts.ts';
import type { BrowserView } from '../types/browser-view.ts';
import type { ButtonCanvasPaint } from '../types/button-canvas-paint.ts';
import { findButtonCanvasHosts } from './find-button-canvas-hosts.ts';
import { isButtonPressed } from './is-button-pressed.ts';
import { nextButtonCanvasPress } from './next-button-canvas-press.ts';
import { readButtonCanvasOffset } from './read-button-canvas-offset.ts';
import { readButtonPalette } from './read-button-palette.ts';
import { writeButtonPressStrength } from './write-button-press-strength.ts';

const { nullish } = P;

const toButtonCanvasPaint = (
  view: BrowserView,
  host: HTMLElement,
  elapsed: number,
): ButtonCanvasPaint | undefined =>
  match(host.querySelector<HTMLCanvasElement>(OEN_BUTTON_CANVAS_CHILD_SELECTOR))
    .with(nullish, () => undefined)
    .otherwise((canvas) =>
      pipe(
        nextButtonCanvasPress(canvas, isButtonPressed(host), elapsed),
        (press) =>
          runEffect(press, () => writeButtonPressStrength(host, press)),
        (press) => ({
          canvas,
          palette: readButtonPalette(view, host),
          offset: readButtonCanvasOffset(canvas),
          press,
        }),
      ),
    );

export const findButtonCanvasPaints = (
  view: BrowserView,
  elapsed: number,
): readonly ButtonCanvasPaint[] =>
  compact(
    map(findButtonCanvasHosts(view.document), (host) =>
      toButtonCanvasPaint(view, host, elapsed),
    ),
  );

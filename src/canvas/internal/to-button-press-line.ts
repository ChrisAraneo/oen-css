import { multiply, subtract } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { OEN_BUTTON_CANVAS_ORIGIN } from '../consts.ts';
import type { ButtonCanvasSize } from '../types/button-canvas-size.ts';
import type { ButtonPressBand } from '../types/button-press-band.ts';
import type { ButtonPressLine } from '../types/button-press-line.ts';

const toDepth = (
  { width, height }: ButtonCanvasSize,
  { depth }: ButtonPressBand,
): number => multiply(Math.min(width, height), depth);

export const toButtonPressLine = (
  size: ButtonCanvasSize,
  band: ButtonPressBand,
): ButtonPressLine =>
  pipe(toDepth(size, band), (depth) =>
    match(band.side)
      .with('top', () => ({
        startLeft: OEN_BUTTON_CANVAS_ORIGIN,
        startTop: OEN_BUTTON_CANVAS_ORIGIN,
        endLeft: OEN_BUTTON_CANVAS_ORIGIN,
        endTop: depth,
      }))
      .with('right', () => ({
        startLeft: size.width,
        startTop: OEN_BUTTON_CANVAS_ORIGIN,
        endLeft: subtract(size.width, depth),
        endTop: OEN_BUTTON_CANVAS_ORIGIN,
      }))
      .with('bottom', () => ({
        startLeft: OEN_BUTTON_CANVAS_ORIGIN,
        startTop: size.height,
        endLeft: OEN_BUTTON_CANVAS_ORIGIN,
        endTop: subtract(size.height, depth),
      }))
      .with('left', () => ({
        startLeft: OEN_BUTTON_CANVAS_ORIGIN,
        startTop: OEN_BUTTON_CANVAS_ORIGIN,
        endLeft: depth,
        endTop: OEN_BUTTON_CANVAS_ORIGIN,
      }))
      .exhaustive(),
  );

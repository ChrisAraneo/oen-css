import { clamp, multiply, round, toFinite } from 'lodash-es';
import { pipe } from 'remeda';
import {
  OEN_BUTTON_CANVAS_MAX_PIXELS,
  OEN_BUTTON_CANVAS_MAX_PIXEL_RATIO,
  OEN_BUTTON_CANVAS_MIN_PIXELS,
  OEN_BUTTON_CANVAS_MIN_PIXEL_RATIO,
} from '../consts.ts';
import type { ButtonCanvasSize } from '../types/button-canvas-size.ts';

const toDevicePixels = (length: number, pixelRatio: number): number =>
  clamp(
    round(multiply(toFinite(length), pixelRatio)),
    OEN_BUTTON_CANVAS_MIN_PIXELS,
    OEN_BUTTON_CANVAS_MAX_PIXELS,
  );

export const toButtonCanvasSize = (
  clientWidth: number,
  clientHeight: number,
  pixelRatio: number,
): ButtonCanvasSize =>
  pipe(
    clamp(
      toFinite(pixelRatio),
      OEN_BUTTON_CANVAS_MIN_PIXEL_RATIO,
      OEN_BUTTON_CANVAS_MAX_PIXEL_RATIO,
    ),
    (ratio) => ({
      width: toDevicePixels(clientWidth, ratio),
      height: toDevicePixels(clientHeight, ratio),
    }),
  );

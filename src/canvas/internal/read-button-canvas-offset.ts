import { toFinite } from 'lodash-es';
import { match, P } from 'ts-pattern';
import {
  OEN_BUTTON_CANVAS_OFFSET_ATTRIBUTE,
  OEN_BUTTON_GRADIENT_FIRST_OFFSET,
} from '../consts.ts';

const { nullish } = P;

export const readButtonCanvasOffset = (canvas: HTMLCanvasElement): number =>
  match(canvas.getAttribute(OEN_BUTTON_CANVAS_OFFSET_ATTRIBUTE))
    .with(nullish, () => OEN_BUTTON_GRADIENT_FIRST_OFFSET)
    .otherwise((offset) => toFinite(offset));

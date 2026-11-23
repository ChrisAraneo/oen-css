import { toFinite } from 'lodash-es';
import { match, P } from 'ts-pattern';
import {
  OEN_BUTTON_CANVAS_PRESS_ATTRIBUTE,
  OEN_BUTTON_PRESS_NO_PROGRESS,
} from '../consts.ts';

const { nullish } = P;

export const readButtonCanvasPress = (canvas: HTMLCanvasElement): number =>
  match(canvas.getAttribute(OEN_BUTTON_CANVAS_PRESS_ATTRIBUTE))
    .with(nullish, () => OEN_BUTTON_PRESS_NO_PROGRESS)
    .otherwise((press) => toFinite(press));

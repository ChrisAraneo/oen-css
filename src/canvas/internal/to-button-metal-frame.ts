import { multiply, toFinite } from 'lodash-es';
import { match } from 'ts-pattern';
import {
  OEN_BUTTON_METAL_SPEED,
  OEN_BUTTON_METAL_STILL_FRAME,
} from '../consts.ts';

export const toButtonMetalFrame = (time: number, still: boolean): number =>
  match(still)
    .with(true, () => OEN_BUTTON_METAL_STILL_FRAME)
    .otherwise(() => multiply(OEN_BUTTON_METAL_SPEED, toFinite(time)));

import { add, multiply } from 'lodash-es';
import { OEN_BUTTON_METAL_SPREAD } from '../consts.ts';

export const toButtonMetalOffsetFrame = (
  frame: number,
  offset: number,
): number => add(frame, multiply(offset, OEN_BUTTON_METAL_SPREAD));

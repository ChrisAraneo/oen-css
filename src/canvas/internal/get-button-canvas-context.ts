import { match, P } from 'ts-pattern';
import { OEN_BUTTON_CANVAS_CONTEXT } from '../consts.ts';

const { nullish } = P;

export const getButtonCanvasContext = (
  canvas: HTMLCanvasElement,
): CanvasRenderingContext2D | undefined =>
  match(canvas.getContext(OEN_BUTTON_CANVAS_CONTEXT))
    .with(nullish, () => undefined)
    .otherwise((context) => context);

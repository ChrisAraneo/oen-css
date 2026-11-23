import { toString } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import { OEN_BUTTON_CANVAS_PRESS_ATTRIBUTE } from '../consts.ts';
import { nextButtonPressProgress } from './next-button-press-progress.ts';
import { readButtonCanvasPress } from './read-button-canvas-press.ts';

const writePress = (canvas: HTMLCanvasElement, press: number): number =>
  runEffect(press, () =>
    canvas.setAttribute(OEN_BUTTON_CANVAS_PRESS_ATTRIBUTE, toString(press)),
  );

export const nextButtonCanvasPress = (
  canvas: HTMLCanvasElement,
  pressed: boolean,
  elapsed: number,
): number =>
  pipe(readButtonCanvasPress(canvas), (press) =>
    match(nextButtonPressProgress(press, pressed, elapsed))
      .with(press, (next) => next)
      .otherwise((next) => writePress(canvas, next)),
  );

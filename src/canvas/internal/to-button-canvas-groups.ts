import { filter, isEqual, map, uniqWith } from 'lodash-es';
import type { ButtonCanvasGroup } from '../types/button-canvas-group.ts';
import type { ButtonCanvasKey } from '../types/button-canvas-key.ts';
import type { ButtonCanvasPaint } from '../types/button-canvas-paint.ts';

const toKey = ({
  palette,
  offset,
  press,
}: ButtonCanvasPaint): ButtonCanvasKey => ({ palette, offset, press });

const toGroup = (
  paints: readonly ButtonCanvasPaint[],
  key: ButtonCanvasKey,
): ButtonCanvasGroup => ({
  palette: key.palette,
  offset: key.offset,
  press: key.press,
  canvases: map(
    filter(paints, (paint) => isEqual(toKey(paint), key)),
    ({ canvas }) => canvas,
  ),
});

export const toButtonCanvasGroups = (
  paints: readonly ButtonCanvasPaint[],
): readonly ButtonCanvasGroup[] =>
  map(uniqWith(map(paints, toKey), isEqual), (key) => toGroup(paints, key));

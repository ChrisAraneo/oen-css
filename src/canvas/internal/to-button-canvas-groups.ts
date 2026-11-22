import { filter, isEqual, map, uniqWith } from 'lodash-es';
import type { ButtonCanvasGroup } from '../types/button-canvas-group.ts';
import type { ButtonCanvasPaint } from '../types/button-canvas-paint.ts';
import type { ButtonPalette } from '../types/button-palette.ts';

const toGroup = (
  paints: readonly ButtonCanvasPaint[],
  palette: ButtonPalette | undefined,
): ButtonCanvasGroup => ({
  palette,
  canvases: map(
    filter(paints, (paint) => isEqual(paint.palette, palette)),
    ({ canvas }) => canvas,
  ),
});

export const toButtonCanvasGroups = (
  paints: readonly ButtonCanvasPaint[],
): readonly ButtonCanvasGroup[] =>
  map(
    uniqWith(
      map(paints, ({ palette }) => palette),
      isEqual,
    ),
    (palette) => toGroup(paints, palette),
  );

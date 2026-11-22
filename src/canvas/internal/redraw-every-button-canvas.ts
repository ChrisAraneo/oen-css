import { flatten, map } from 'lodash-es';
import { pipe } from 'remeda';
import type { BrowserView } from '../types/browser-view.ts';
import type { ButtonCanvasPainter } from '../types/button-canvas-painter.ts';
import { drawButtonCanvasGroup } from './draw-button-canvas-group.ts';
import { findButtonCanvasPaints } from './find-button-canvas-paints.ts';
import { toButtonCanvasGroups } from './to-button-canvas-groups.ts';

export const redrawEveryButtonCanvas = (
  view: BrowserView,
  painter: ButtonCanvasPainter,
  phase: number,
): readonly HTMLCanvasElement[] =>
  pipe(
    findButtonCanvasPaints(view),
    toButtonCanvasGroups,
    (groups) =>
      map(groups, (group) => drawButtonCanvasGroup(painter, group, phase)),
    flatten,
  );

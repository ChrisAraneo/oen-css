import { size } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import type { ButtonCanvasPaint } from '../types/button-canvas-paint.ts';
import { toButtonCanvasGroups } from './to-button-canvas-groups.ts';

const BLUE = { hue: 210, saturation: 71, lightness: 53 };

const RED = { hue: 348, saturation: 86, lightness: 61 };

const toPaint = (
  name: string,
  palette: ButtonCanvasPaint['palette'],
): ButtonCanvasPaint => ({
  canvas: { id: name } as unknown as HTMLCanvasElement,
  palette,
});

describe('toButtonCanvasGroups', () => {
  it('should return no group when there is no paint', () => {
    expect(toButtonCanvasGroups([])).toEqual([]);
  });

  it('should return one group when every paint carries the same palette', () => {
    expect(
      toButtonCanvasGroups([toPaint('a', BLUE), toPaint('b', { ...BLUE })]),
    ).toEqual([{ palette: BLUE, canvases: [{ id: 'a' }, { id: 'b' }] }]);
  });

  it('should return one group for each palette when the paints carry two palettes', () => {
    expect(
      size(
        toButtonCanvasGroups([
          toPaint('a', BLUE),
          toPaint('b', RED),
          toPaint('c', BLUE),
        ]),
      ),
    ).toBe(2);
  });

  it('should return every canvas of a palette in one group when the paints are grouped', () => {
    expect(
      toButtonCanvasGroups([
        toPaint('a', BLUE),
        toPaint('b', RED),
        toPaint('c', BLUE),
      ])[0]?.canvases,
    ).toEqual([{ id: 'a' }, { id: 'c' }]);
  });

  it('should return a group without a palette when a paint has no palette', () => {
    expect(
      toButtonCanvasGroups([toPaint('a', undefined), toPaint('b', BLUE)])[0],
    ).toEqual({ palette: undefined, canvases: [{ id: 'a' }] });
  });

  it('should return the groups in the order the palettes first appear when the paints are grouped', () => {
    expect(
      toButtonCanvasGroups([toPaint('a', RED), toPaint('b', BLUE)])[0]?.palette,
    ).toEqual(RED);
  });
});

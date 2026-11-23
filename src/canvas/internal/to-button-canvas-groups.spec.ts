import { size } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import type { ButtonCanvasPaint } from '../types/button-canvas-paint.ts';
import { toButtonCanvasGroups } from './to-button-canvas-groups.ts';

const BLUE = { hue: 210, saturation: 71, lightness: 53 };

const RED = { hue: 348, saturation: 86, lightness: 61 };

const FIRST_OFFSET = 0;

const LATER_OFFSET = 0.375;

const RELEASED = false;

const PRESSED = true;

const toPaint = (
  name: string,
  palette: ButtonCanvasPaint['palette'],
  offset: number,
  pressed: boolean = RELEASED,
): ButtonCanvasPaint => ({
  canvas: { id: name } as unknown as HTMLCanvasElement,
  palette,
  offset,
  pressed,
});

describe('toButtonCanvasGroups', () => {
  it('should return no group when there is no paint', () => {
    expect(toButtonCanvasGroups([])).toEqual([]);
  });

  it('should return one group when every paint carries the same palette, offset and press', () => {
    expect(
      toButtonCanvasGroups([
        toPaint('a', BLUE, FIRST_OFFSET),
        toPaint('b', { ...BLUE }, FIRST_OFFSET),
      ]),
    ).toEqual([
      {
        palette: BLUE,
        offset: FIRST_OFFSET,
        pressed: RELEASED,
        canvases: [{ id: 'a' }, { id: 'b' }],
      },
    ]);
  });

  it('should return one group for each palette when the paints carry two palettes', () => {
    expect(
      size(
        toButtonCanvasGroups([
          toPaint('a', BLUE, FIRST_OFFSET),
          toPaint('b', RED, FIRST_OFFSET),
          toPaint('c', BLUE, FIRST_OFFSET),
        ]),
      ),
    ).toBe(2);
  });

  it('should return one group for each offset when the paints share a palette but carry two offsets', () => {
    expect(
      size(
        toButtonCanvasGroups([
          toPaint('a', BLUE, FIRST_OFFSET),
          toPaint('b', BLUE, LATER_OFFSET),
          toPaint('c', BLUE, FIRST_OFFSET),
        ]),
      ),
    ).toBe(2);
  });

  it('should return one group for each press when the paints share a palette and an offset but one is pressed', () => {
    expect(
      size(
        toButtonCanvasGroups([
          toPaint('a', BLUE, FIRST_OFFSET, RELEASED),
          toPaint('b', BLUE, FIRST_OFFSET, PRESSED),
          toPaint('c', BLUE, FIRST_OFFSET, RELEASED),
        ]),
      ),
    ).toBe(2);
  });

  it('should return every canvas of a palette in one group when the paints are grouped', () => {
    expect(
      toButtonCanvasGroups([
        toPaint('a', BLUE, FIRST_OFFSET),
        toPaint('b', RED, FIRST_OFFSET),
        toPaint('c', BLUE, FIRST_OFFSET),
      ])[0]?.canvases,
    ).toEqual([{ id: 'a' }, { id: 'c' }]);
  });

  it('should return only the canvases that share an offset when the paints carry two offsets', () => {
    expect(
      toButtonCanvasGroups([
        toPaint('a', BLUE, FIRST_OFFSET),
        toPaint('b', BLUE, LATER_OFFSET),
        toPaint('c', BLUE, FIRST_OFFSET),
      ])[0]?.canvases,
    ).toEqual([{ id: 'a' }, { id: 'c' }]);
  });

  it('should return only the canvases that are released when one paint is pressed', () => {
    expect(
      toButtonCanvasGroups([
        toPaint('a', BLUE, FIRST_OFFSET, RELEASED),
        toPaint('b', BLUE, FIRST_OFFSET, PRESSED),
        toPaint('c', BLUE, FIRST_OFFSET, RELEASED),
      ])[0]?.canvases,
    ).toEqual([{ id: 'a' }, { id: 'c' }]);
  });

  it('should return the offset its canvases carry when a group is returned', () => {
    expect(
      toButtonCanvasGroups([
        toPaint('a', BLUE, LATER_OFFSET),
        toPaint('b', BLUE, FIRST_OFFSET),
      ])[0]?.offset,
    ).toBe(LATER_OFFSET);
  });

  it('should return the press its canvases carry when a group is returned', () => {
    expect(
      toButtonCanvasGroups([
        toPaint('a', BLUE, FIRST_OFFSET, PRESSED),
        toPaint('b', BLUE, FIRST_OFFSET, RELEASED),
      ])[0]?.pressed,
    ).toBe(PRESSED);
  });

  it('should return a group without a palette when a paint has no palette', () => {
    expect(
      toButtonCanvasGroups([
        toPaint('a', undefined, FIRST_OFFSET),
        toPaint('b', BLUE, FIRST_OFFSET),
      ])[0],
    ).toEqual({
      palette: undefined,
      offset: FIRST_OFFSET,
      pressed: RELEASED,
      canvases: [{ id: 'a' }],
    });
  });

  it('should return the groups in the order the palettes first appear when the paints are grouped', () => {
    expect(
      toButtonCanvasGroups([
        toPaint('a', RED, FIRST_OFFSET),
        toPaint('b', BLUE, FIRST_OFFSET),
      ])[0]?.palette,
    ).toEqual(RED);
  });
});

import { every, includes, inRange, map, range, size, uniq } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { createButtonCanvasOffset } from './create-button-canvas-offset.ts';

const EVERY_OFFSET: readonly number[] = [
  0, 0.0625, 0.125, 0.1875, 0.25, 0.3125, 0.375, 0.4375, 0.5, 0.5625, 0.625,
  0.6875, 0.75, 0.8125, 0.875, 0.9375,
];

const SAMPLES = 600;

const CYCLE_START = 0;

const CYCLE_END = 1;

const toEveryDrawnOffset = (): readonly number[] =>
  map(range(SAMPLES), () => createButtonCanvasOffset());

describe('createButtonCanvasOffset', () => {
  it('should return one of the sixteen offsets when an offset is drawn', () => {
    expect(
      every(toEveryDrawnOffset(), (offset) => includes(EVERY_OFFSET, offset)),
    ).toBe(true);
  });

  it('should return an offset inside the cycle when an offset is drawn', () => {
    expect(
      every(toEveryDrawnOffset(), (offset) =>
        inRange(offset, CYCLE_START, CYCLE_END),
      ),
    ).toBe(true);
  });

  it('should return every one of the sixteen offsets when many offsets are drawn', () => {
    expect(size(uniq(toEveryDrawnOffset()))).toBe(size(EVERY_OFFSET));
  });
});

import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_PRESS_MAX_ELAPSED,
  OEN_BUTTON_PRESS_NO_ELAPSED,
} from '../consts.ts';
import { toButtonPressElapsed } from './to-button-press-elapsed.ts';

const MOVING = false;

const STILL = true;

const FRAME = 16;

const LAST_TIME = 1000;

describe('toButtonPressElapsed', () => {
  it('should return the time between the frames when one frame has passed', () => {
    expect(toButtonPressElapsed(LAST_TIME + FRAME, LAST_TIME, MOVING)).toBe(
      FRAME,
    );
  });

  it('should return no elapsed time when the frame repeats the same time', () => {
    expect(toButtonPressElapsed(LAST_TIME, LAST_TIME, MOVING)).toBe(
      OEN_BUTTON_PRESS_NO_ELAPSED,
    );
  });

  it('should return no elapsed time when the frame runs backward', () => {
    expect(toButtonPressElapsed(LAST_TIME - FRAME, LAST_TIME, MOVING)).toBe(
      OEN_BUTTON_PRESS_NO_ELAPSED,
    );
  });

  it('should return the longest elapsed time when the page was away for longer', () => {
    expect(
      toButtonPressElapsed(
        LAST_TIME + OEN_BUTTON_PRESS_MAX_ELAPSED * 10,
        LAST_TIME,
        MOVING,
      ),
    ).toBe(OEN_BUTTON_PRESS_MAX_ELAPSED);
  });

  it('should return the longest elapsed time when motion is not wanted', () => {
    expect(toButtonPressElapsed(LAST_TIME + FRAME, LAST_TIME, STILL)).toBe(
      OEN_BUTTON_PRESS_MAX_ELAPSED,
    );
  });

  it('should return no elapsed time when the time is `NaN`', () => {
    expect(
      toButtonPressElapsed(Number.NaN, OEN_BUTTON_PRESS_NO_ELAPSED, MOVING),
    ).toBe(OEN_BUTTON_PRESS_NO_ELAPSED);
  });
});

import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_PRESS_FULL_PROGRESS,
  OEN_BUTTON_PRESS_LIFT_DURATION,
  OEN_BUTTON_PRESS_NO_ELAPSED,
  OEN_BUTTON_PRESS_NO_PROGRESS,
  OEN_BUTTON_PRESS_SINK_DURATION,
} from '../consts.ts';
import { nextButtonPressProgress } from './next-button-press-progress.ts';

const HELD = true;

const LET_GO = false;

const HALF = 0.5;

describe('nextButtonPressProgress', () => {
  it('should return full progress when a held button has sunk for the whole sink duration', () => {
    expect(
      nextButtonPressProgress(
        OEN_BUTTON_PRESS_NO_PROGRESS,
        HELD,
        OEN_BUTTON_PRESS_SINK_DURATION,
      ),
    ).toBe(OEN_BUTTON_PRESS_FULL_PROGRESS);
  });

  it('should return half the progress when a held button has sunk for half the sink duration', () => {
    expect(
      nextButtonPressProgress(
        OEN_BUTTON_PRESS_NO_PROGRESS,
        HELD,
        OEN_BUTTON_PRESS_SINK_DURATION * HALF,
      ),
    ).toBe(HALF);
  });

  it('should return no progress when a released button has lifted for the whole lift duration', () => {
    expect(
      nextButtonPressProgress(
        OEN_BUTTON_PRESS_FULL_PROGRESS,
        LET_GO,
        OEN_BUTTON_PRESS_LIFT_DURATION,
      ),
    ).toBe(OEN_BUTTON_PRESS_NO_PROGRESS);
  });

  it('should return half the progress when a released button has lifted for half the lift duration', () => {
    expect(
      nextButtonPressProgress(
        OEN_BUTTON_PRESS_FULL_PROGRESS,
        LET_GO,
        OEN_BUTTON_PRESS_LIFT_DURATION * HALF,
      ),
    ).toBe(HALF);
  });

  it('should return full progress when a held button has sunk past the sink duration', () => {
    expect(
      nextButtonPressProgress(HALF, HELD, OEN_BUTTON_PRESS_SINK_DURATION * 10),
    ).toBe(OEN_BUTTON_PRESS_FULL_PROGRESS);
  });

  it('should return no progress when a released button has lifted past the lift duration', () => {
    expect(
      nextButtonPressProgress(
        HALF,
        LET_GO,
        OEN_BUTTON_PRESS_LIFT_DURATION * 10,
      ),
    ).toBe(OEN_BUTTON_PRESS_NO_PROGRESS);
  });

  it('should return the given progress when no time has passed', () => {
    expect(
      nextButtonPressProgress(HALF, HELD, OEN_BUTTON_PRESS_NO_ELAPSED),
    ).toBe(HALF);
  });

  it('should return the given progress when no time has passed and the button is released', () => {
    expect(
      nextButtonPressProgress(HALF, LET_GO, OEN_BUTTON_PRESS_NO_ELAPSED),
    ).toBe(HALF);
  });

  it('should return a lower progress when a half sunk button is released', () => {
    expect(
      nextButtonPressProgress(HALF, LET_GO, OEN_BUTTON_PRESS_LIFT_DURATION / 4),
    ).toBeLessThan(HALF);
  });

  it('should return a higher progress when a half lifted button is held again', () => {
    expect(
      nextButtonPressProgress(HALF, HELD, OEN_BUTTON_PRESS_SINK_DURATION / 4),
    ).toBeGreaterThan(HALF);
  });

  it('should return more progress from a sink than from a lift when the same time has passed', () => {
    expect(
      nextButtonPressProgress(
        OEN_BUTTON_PRESS_NO_PROGRESS,
        HELD,
        OEN_BUTTON_PRESS_SINK_DURATION * HALF,
      ),
    ).toBeGreaterThan(
      OEN_BUTTON_PRESS_FULL_PROGRESS -
        nextButtonPressProgress(
          OEN_BUTTON_PRESS_FULL_PROGRESS,
          LET_GO,
          OEN_BUTTON_PRESS_SINK_DURATION * HALF,
        ),
    );
  });
});

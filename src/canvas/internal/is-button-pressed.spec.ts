import { describe, expect, it } from 'vitest';
import { OEN_BUTTON_PRESS_SELECTOR } from '../consts.ts';
import { isButtonPressed } from './is-button-pressed.ts';

const toHost = (pressed: boolean): Element =>
  ({
    matches: (selector: string): boolean =>
      selector === OEN_BUTTON_PRESS_SELECTOR && pressed,
  }) as unknown as Element;

describe('isButtonPressed', () => {
  it('should return `true` when the host matches the press selector', () => {
    expect(isButtonPressed(toHost(true))).toBe(true);
  });

  it('should return `false` when the host does not match the press selector', () => {
    expect(isButtonPressed(toHost(false))).toBe(false);
  });
});

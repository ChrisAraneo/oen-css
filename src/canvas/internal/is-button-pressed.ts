import { OEN_BUTTON_PRESS_SELECTOR } from '../consts.ts';

export const isButtonPressed = (host: Element): boolean =>
  host.matches(OEN_BUTTON_PRESS_SELECTOR);

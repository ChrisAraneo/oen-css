import { OEN_BUTTON_GRADIENT_STILL_QUERY } from '../consts.ts';
import type { BrowserView } from '../types/browser-view.ts';

export const isButtonGradientStill = (view: BrowserView): boolean =>
  view.matchMedia(OEN_BUTTON_GRADIENT_STILL_QUERY).matches;

import type { BrowserView } from '../types/browser-view.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { toButtonPalette } from './to-button-palette.ts';

export const readButtonPalette = (
  view: BrowserView,
  host: Element,
): ButtonPalette | undefined =>
  toButtonPalette(view.getComputedStyle(host).backgroundColor);

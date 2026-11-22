import { filter } from 'lodash-es';
import { OEN_BUTTON_CANVAS_HOST_SELECTOR } from '../consts.ts';
import { canHoldButtonCanvas } from './can-hold-button-canvas.ts';

export const findButtonCanvasHosts = (
  document: Document,
): readonly HTMLElement[] =>
  filter(
    document.querySelectorAll<HTMLElement>(OEN_BUTTON_CANVAS_HOST_SELECTOR),
    (host) => canHoldButtonCanvas(host.tagName),
  );

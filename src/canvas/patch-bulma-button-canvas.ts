import { escapeRegExp, replace } from 'lodash-es';
import { formatButtonCanvasRules } from './format-button-canvas-rules.ts';

const NOTHING = '';

const BUTTON_CANVAS_RULES_AT_END = new RegExp(
  `\n*${escapeRegExp(formatButtonCanvasRules())}$`,
);

export const patchBulmaButtonCanvas = (css: string): string =>
  replace(css, BUTTON_CANVAS_RULES_AT_END, NOTHING);

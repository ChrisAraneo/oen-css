import { formatButtonCanvasRules } from './format-button-canvas-rules.ts';

export const patchOenButtonCanvas = (source: string): string =>
  `${source}\n${formatButtonCanvasRules()}\n`;

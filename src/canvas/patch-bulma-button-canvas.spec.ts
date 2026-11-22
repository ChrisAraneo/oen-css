import { describe, expect, it } from 'vitest';
import { formatButtonCanvasRules } from './format-button-canvas-rules.ts';
import { patchBulmaButtonCanvas } from './patch-bulma-button-canvas.ts';

const BULMA_CSS = '.is-clickable {\n  cursor: pointer !important;\n}';

describe('patchBulmaButtonCanvas', () => {
  it('should return the stylesheet without the rules when they are separated by a blank line', () => {
    expect(
      patchBulmaButtonCanvas(`${BULMA_CSS}\n\n${formatButtonCanvasRules()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet without the rules when they are on the next line', () => {
    expect(
      patchBulmaButtonCanvas(`${BULMA_CSS}\n${formatButtonCanvasRules()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when it carries no button canvas rules', () => {
    expect(patchBulmaButtonCanvas(BULMA_CSS)).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when the rules are not at the end', () => {
    const css = `${formatButtonCanvasRules()}\n${BULMA_CSS}`;

    expect(patchBulmaButtonCanvas(css)).toBe(css);
  });

  it('should return an empty string when the stylesheet is only the rules', () => {
    expect(patchBulmaButtonCanvas(formatButtonCanvasRules())).toBe('');
  });
});

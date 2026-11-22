import { describe, expect, it } from 'vitest';
import { formatButtonBorderRules } from './format-button-border-rules.ts';
import { patchBulmaButtonBorder } from './patch-bulma-button-border.ts';

const BULMA_CSS = '.is-clickable {\n  cursor: pointer !important;\n}';

describe('patchBulmaButtonBorder', () => {
  it('should return the stylesheet without the rules when they are separated by a blank line', () => {
    expect(
      patchBulmaButtonBorder(`${BULMA_CSS}\n\n${formatButtonBorderRules()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet without the rules when they are on the next line', () => {
    expect(
      patchBulmaButtonBorder(`${BULMA_CSS}\n${formatButtonBorderRules()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when it carries no button border rules', () => {
    expect(patchBulmaButtonBorder(BULMA_CSS)).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when the rules are not at the end', () => {
    const css = `${formatButtonBorderRules()}\n${BULMA_CSS}`;

    expect(patchBulmaButtonBorder(css)).toBe(css);
  });

  it('should return an empty string when the stylesheet is only the rules', () => {
    expect(patchBulmaButtonBorder(formatButtonBorderRules())).toBe('');
  });
});

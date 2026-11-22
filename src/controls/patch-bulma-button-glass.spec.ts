import { describe, expect, it } from 'vitest';
import { formatButtonGlassRules } from './format-button-glass-rules.ts';
import { patchBulmaButtonGlass } from './patch-bulma-button-glass.ts';

const BULMA_CSS = '.is-clickable {\n  cursor: pointer !important;\n}';

describe('patchBulmaButtonGlass', () => {
  it('should return the stylesheet without the rules when they are separated by a blank line', () => {
    expect(
      patchBulmaButtonGlass(`${BULMA_CSS}\n\n${formatButtonGlassRules()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet without the rules when they are on the next line', () => {
    expect(
      patchBulmaButtonGlass(`${BULMA_CSS}\n${formatButtonGlassRules()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when it carries no button glass rules', () => {
    expect(patchBulmaButtonGlass(BULMA_CSS)).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when the rules are not at the end', () => {
    const css = `${formatButtonGlassRules()}\n${BULMA_CSS}`;

    expect(patchBulmaButtonGlass(css)).toBe(css);
  });

  it('should return an empty string when the stylesheet is only the rules', () => {
    expect(patchBulmaButtonGlass(formatButtonGlassRules())).toBe('');
  });
});

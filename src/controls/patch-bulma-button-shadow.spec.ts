import { describe, expect, it } from 'vitest';
import { formatButtonShadowRules } from './format-button-shadow-rules.ts';
import { patchBulmaButtonShadow } from './patch-bulma-button-shadow.ts';

const BULMA_CSS = '.is-clickable {\n  cursor: pointer !important;\n}';

describe('patchBulmaButtonShadow', () => {
  it('should return the stylesheet without the rule when it is separated by a blank line', () => {
    expect(
      patchBulmaButtonShadow(`${BULMA_CSS}\n\n${formatButtonShadowRules()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet without the rule when it is on the next line', () => {
    expect(
      patchBulmaButtonShadow(`${BULMA_CSS}\n${formatButtonShadowRules()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when it carries no button shadow rule', () => {
    expect(patchBulmaButtonShadow(BULMA_CSS)).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when the rule is not at the end', () => {
    const css = `${formatButtonShadowRules()}\n${BULMA_CSS}`;

    expect(patchBulmaButtonShadow(css)).toBe(css);
  });

  it('should return an empty string when the stylesheet is only the rule', () => {
    expect(patchBulmaButtonShadow(formatButtonShadowRules())).toBe('');
  });
});

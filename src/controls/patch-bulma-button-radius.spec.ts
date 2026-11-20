import { describe, expect, it } from 'vitest';
import { formatButtonRadiusRule } from './format-button-radius-rule.ts';
import { patchBulmaButtonRadius } from './patch-bulma-button-radius.ts';

const BULMA_CSS = '.is-clickable {\n  cursor: pointer !important;\n}';

describe('patchBulmaButtonRadius', () => {
  it('should return the stylesheet without the rule when the rule is separated by a blank line', () => {
    expect(
      patchBulmaButtonRadius(`${BULMA_CSS}\n\n${formatButtonRadiusRule()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet without the rule when the rule is on the next line', () => {
    expect(
      patchBulmaButtonRadius(`${BULMA_CSS}\n${formatButtonRadiusRule()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when it carries no button radius rule', () => {
    expect(patchBulmaButtonRadius(BULMA_CSS)).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when the rule is not at the end', () => {
    const css = `${formatButtonRadiusRule()}\n${BULMA_CSS}`;

    expect(patchBulmaButtonRadius(css)).toBe(css);
  });

  it('should return an empty string when the stylesheet is only the rule', () => {
    expect(patchBulmaButtonRadius(formatButtonRadiusRule())).toBe('');
  });
});

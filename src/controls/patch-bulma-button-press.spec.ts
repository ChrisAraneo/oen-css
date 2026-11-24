import { describe, expect, it } from 'vitest';
import { formatButtonPressRule } from './format-button-press-rule.ts';
import { patchBulmaButtonPress } from './patch-bulma-button-press.ts';

const BULMA_CSS = '.is-clickable {\n  cursor: pointer !important;\n}';

describe('patchBulmaButtonPress', () => {
  it('should return the stylesheet without the rule when it is separated by a blank line', () => {
    expect(
      patchBulmaButtonPress(`${BULMA_CSS}\n\n${formatButtonPressRule()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet without the rule when it is on the next line', () => {
    expect(
      patchBulmaButtonPress(`${BULMA_CSS}\n${formatButtonPressRule()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when it carries no button press rule', () => {
    expect(patchBulmaButtonPress(BULMA_CSS)).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when the rule is not at the end', () => {
    const css = `${formatButtonPressRule()}\n${BULMA_CSS}`;

    expect(patchBulmaButtonPress(css)).toBe(css);
  });

  it('should return an empty string when the stylesheet is only the rule', () => {
    expect(patchBulmaButtonPress(formatButtonPressRule())).toBe('');
  });
});

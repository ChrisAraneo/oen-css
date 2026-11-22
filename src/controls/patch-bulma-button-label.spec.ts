import { describe, expect, it } from 'vitest';
import { formatButtonLabelRule } from './format-button-label-rule.ts';
import { patchBulmaButtonLabel } from './patch-bulma-button-label.ts';

const BULMA_CSS = '.is-clickable {\n  cursor: pointer !important;\n}';

describe('patchBulmaButtonLabel', () => {
  it('should return the stylesheet without the rule when it is separated by a blank line', () => {
    expect(
      patchBulmaButtonLabel(`${BULMA_CSS}\n\n${formatButtonLabelRule()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet without the rule when it is on the next line', () => {
    expect(
      patchBulmaButtonLabel(`${BULMA_CSS}\n${formatButtonLabelRule()}`),
    ).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when it carries no button label rule', () => {
    expect(patchBulmaButtonLabel(BULMA_CSS)).toBe(BULMA_CSS);
  });

  it('should return the stylesheet unchanged when the rule is not at the end', () => {
    const css = `${formatButtonLabelRule()}\n${BULMA_CSS}`;

    expect(patchBulmaButtonLabel(css)).toBe(css);
  });

  it('should return an empty string when the stylesheet is only the rule', () => {
    expect(patchBulmaButtonLabel(formatButtonLabelRule())).toBe('');
  });
});

import { describe, expect, it } from 'vitest';
import { formatButtonLabelRule } from './format-button-label-rule.ts';
import { patchOenButtonLabel } from './patch-oen-button-label.ts';

const SOURCE = '@use "pkg:bulma/sass" with (\n  $primary: #2DE5A7\n);\n';

describe('patchOenButtonLabel', () => {
  it('should return the source with the button label rule appended when called with the Sass source', () => {
    expect(patchOenButtonLabel(SOURCE)).toBe(
      `${SOURCE}\n${formatButtonLabelRule()}\n`,
    );
  });

  it('should return the source unchanged at the start when called with the Sass source', () => {
    expect(patchOenButtonLabel(SOURCE).startsWith(SOURCE)).toBe(true);
  });

  it('should return a source that ends with a newline when called with the Sass source', () => {
    expect(patchOenButtonLabel(SOURCE).endsWith('\n')).toBe(true);
  });

  it('should return only the rule when called with an empty source', () => {
    expect(patchOenButtonLabel('')).toBe(`\n${formatButtonLabelRule()}\n`);
  });

  it('should return the rule once when called twice with the same source', () => {
    expect(
      patchOenButtonLabel(SOURCE).split(formatButtonLabelRule()),
    ).toHaveLength(2);
  });
});

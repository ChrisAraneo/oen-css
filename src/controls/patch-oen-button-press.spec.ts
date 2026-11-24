import { describe, expect, it } from 'vitest';
import { formatButtonPressRule } from './format-button-press-rule.ts';
import { patchOenButtonPress } from './patch-oen-button-press.ts';

const SOURCE = '@use "pkg:bulma/sass" with (\n  $primary: #2DE5A7\n);\n';

describe('patchOenButtonPress', () => {
  it('should return the source with the button press rule appended when called with the Sass source', () => {
    expect(patchOenButtonPress(SOURCE)).toBe(
      `${SOURCE}\n${formatButtonPressRule()}\n`,
    );
  });

  it('should return the source unchanged at the start when called with the Sass source', () => {
    expect(patchOenButtonPress(SOURCE).startsWith(SOURCE)).toBe(true);
  });

  it('should return a source that ends with a newline when called with the Sass source', () => {
    expect(patchOenButtonPress(SOURCE).endsWith('\n')).toBe(true);
  });

  it('should return only the rule when called with an empty source', () => {
    expect(patchOenButtonPress('')).toBe(`\n${formatButtonPressRule()}\n`);
  });

  it('should return the rule once when called twice with the same source', () => {
    expect(
      patchOenButtonPress(SOURCE).split(formatButtonPressRule()),
    ).toHaveLength(2);
  });
});

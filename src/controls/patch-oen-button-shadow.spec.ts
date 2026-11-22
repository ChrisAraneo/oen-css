import { describe, expect, it } from 'vitest';
import { formatButtonShadowRules } from './format-button-shadow-rules.ts';
import { patchOenButtonShadow } from './patch-oen-button-shadow.ts';

const SOURCE = '@use "pkg:bulma/sass" with (\n  $primary: #2DE5A7\n);\n';

describe('patchOenButtonShadow', () => {
  it('should return the source with the button shadow rule appended when called with the Sass source', () => {
    expect(patchOenButtonShadow(SOURCE)).toBe(
      `${SOURCE}\n${formatButtonShadowRules()}\n`,
    );
  });

  it('should return the source unchanged at the start when called with the Sass source', () => {
    expect(patchOenButtonShadow(SOURCE).startsWith(SOURCE)).toBe(true);
  });

  it('should return a source that ends with a newline when called with the Sass source', () => {
    expect(patchOenButtonShadow(SOURCE).endsWith('\n')).toBe(true);
  });

  it('should return only the rule when called with an empty source', () => {
    expect(patchOenButtonShadow('')).toBe(`\n${formatButtonShadowRules()}\n`);
  });

  it('should return the rule once when called twice with the same source', () => {
    expect(
      patchOenButtonShadow(SOURCE).split(formatButtonShadowRules()),
    ).toHaveLength(2);
  });
});

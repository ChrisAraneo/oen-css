import { describe, expect, it } from 'vitest';
import { formatButtonRadiusRule } from './format-button-radius-rule.ts';
import { patchOenButtonRadius } from './patch-oen-button-radius.ts';

const SOURCE = '@use "pkg:bulma/sass" with (\n  $primary: #2DE5A7\n);\n';

describe('patchOenButtonRadius', () => {
  it('should return the source with the button radius rule appended when called with the Sass source', () => {
    expect(patchOenButtonRadius(SOURCE)).toBe(
      `${SOURCE}\n${formatButtonRadiusRule()}\n`,
    );
  });

  it('should return the source unchanged at the start when called with the Sass source', () => {
    expect(patchOenButtonRadius(SOURCE).startsWith(SOURCE)).toBe(true);
  });

  it('should return a source that ends with a newline when called with the Sass source', () => {
    expect(patchOenButtonRadius(SOURCE).endsWith('\n')).toBe(true);
  });

  it('should return only the rule when called with an empty source', () => {
    expect(patchOenButtonRadius('')).toBe(`\n${formatButtonRadiusRule()}\n`);
  });

  it('should return the rule once when called twice with the same source', () => {
    expect(
      patchOenButtonRadius(SOURCE).split(formatButtonRadiusRule()),
    ).toHaveLength(2);
  });
});

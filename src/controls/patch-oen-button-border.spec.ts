import { describe, expect, it } from 'vitest';
import { formatButtonBorderRules } from './format-button-border-rules.ts';
import { patchOenButtonBorder } from './patch-oen-button-border.ts';

const SOURCE = '@use "pkg:bulma/sass" with (\n  $primary: #2DE5A7\n);\n';

describe('patchOenButtonBorder', () => {
  it('should return the source with both button border rules appended when called with the Sass source', () => {
    expect(patchOenButtonBorder(SOURCE)).toBe(
      `${SOURCE}\n${formatButtonBorderRules()}\n`,
    );
  });

  it('should return the source unchanged at the start when called with the Sass source', () => {
    expect(patchOenButtonBorder(SOURCE).startsWith(SOURCE)).toBe(true);
  });

  it('should return a source that ends with a newline when called with the Sass source', () => {
    expect(patchOenButtonBorder(SOURCE).endsWith('\n')).toBe(true);
  });

  it('should return only the rules when called with an empty source', () => {
    expect(patchOenButtonBorder('')).toBe(`\n${formatButtonBorderRules()}\n`);
  });

  it('should return the rules once when called twice with the same source', () => {
    expect(
      patchOenButtonBorder(SOURCE).split(formatButtonBorderRules()),
    ).toHaveLength(2);
  });
});

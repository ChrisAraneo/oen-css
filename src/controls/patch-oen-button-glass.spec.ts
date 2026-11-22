import { describe, expect, it } from 'vitest';
import { formatButtonGlassRules } from './format-button-glass-rules.ts';
import { patchOenButtonGlass } from './patch-oen-button-glass.ts';

const SOURCE = '@use "pkg:bulma/sass" with (\n  $primary: #2DE5A7\n);\n';

describe('patchOenButtonGlass', () => {
  it('should return the source with the button glass rules appended when called with the Sass source', () => {
    expect(patchOenButtonGlass(SOURCE)).toBe(
      `${SOURCE}\n${formatButtonGlassRules()}\n`,
    );
  });

  it('should return the source unchanged at the start when called with the Sass source', () => {
    expect(patchOenButtonGlass(SOURCE).startsWith(SOURCE)).toBe(true);
  });

  it('should return a source that ends with a newline when called with the Sass source', () => {
    expect(patchOenButtonGlass(SOURCE).endsWith('\n')).toBe(true);
  });

  it('should return only the rules when called with an empty source', () => {
    expect(patchOenButtonGlass('')).toBe(`\n${formatButtonGlassRules()}\n`);
  });

  it('should return the rules once when called twice with the same source', () => {
    expect(
      patchOenButtonGlass(SOURCE).split(formatButtonGlassRules()),
    ).toHaveLength(2);
  });
});

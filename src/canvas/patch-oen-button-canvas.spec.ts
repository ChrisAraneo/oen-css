import { describe, expect, it } from 'vitest';
import { formatButtonCanvasRules } from './format-button-canvas-rules.ts';
import { patchOenButtonCanvas } from './patch-oen-button-canvas.ts';

const SOURCE = "@use 'pkg:bulma/sass';";

describe('patchOenButtonCanvas', () => {
  it('should return the source with the rules appended when called with the Sass source', () => {
    expect(patchOenButtonCanvas(SOURCE)).toBe(
      `${SOURCE}\n${formatButtonCanvasRules()}\n`,
    );
  });

  it('should return the source first when called with the Sass source', () => {
    expect(patchOenButtonCanvas(SOURCE).startsWith(SOURCE)).toBe(true);
  });

  it('should return a trailing newline when called with the Sass source', () => {
    expect(patchOenButtonCanvas(SOURCE).endsWith('}\n')).toBe(true);
  });

  it('should not change the old source when the rules are appended', () => {
    patchOenButtonCanvas(SOURCE);

    expect(SOURCE).toBe("@use 'pkg:bulma/sass';");
  });

  it('should return only the rules when called with an empty source', () => {
    expect(patchOenButtonCanvas('')).toBe(`\n${formatButtonCanvasRules()}\n`);
  });
});

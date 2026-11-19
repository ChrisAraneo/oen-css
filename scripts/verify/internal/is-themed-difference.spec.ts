import { describe, expect, it } from 'vitest';
import { isThemedDifference } from './is-themed-difference.ts';

describe('isThemedDifference', () => {
  it('should return `true` when both lines are theme declarations', () => {
    expect(
      isThemedDifference({
        lineNumber: 1,
        ours: '--bulma-primary: #2DE5A7;',
        theirs: '--bulma-primary: #00d1b2;',
      }),
    ).toBe(true);
  });

  it('should return `false` when only our line is a theme declaration', () => {
    expect(
      isThemedDifference({
        lineNumber: 1,
        ours: '--bulma-primary: red;',
        theirs: 'margin: 0;',
      }),
    ).toBe(false);
  });

  it('should return `false` when neither line is a theme declaration', () => {
    expect(
      isThemedDifference({
        lineNumber: 1,
        ours: '.button {',
        theirs: '.buton {',
      }),
    ).toBe(false);
  });

  it('should return `false` when their line is `undefined`', () => {
    expect(
      isThemedDifference({
        lineNumber: 1,
        ours: '--bulma-primary: red;',
        theirs: undefined,
      }),
    ).toBe(false);
  });

  it('should return `true` when both lines declare `font-size`', () => {
    expect(
      isThemedDifference({
        lineNumber: 1,
        ours: 'font-size: 0.875em;',
        theirs: 'font-size: 1em;',
      }),
    ).toBe(true);
  });
});

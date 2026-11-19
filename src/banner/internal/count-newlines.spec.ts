import { describe, expect, it } from 'vitest';
import { countNewlines } from './count-newlines.ts';

describe('countNewlines', () => {
  it('should return 0 when the text is empty', () => {
    expect(countNewlines('')).toBe(0);
  });

  it('should return 0 when the text is one line', () => {
    expect(countNewlines('body {}')).toBe(0);
  });

  it('should return 1 when the text is two lines', () => {
    expect(countNewlines('a\nb')).toBe(1);
  });

  it('should return 1 when the text ends with a newline', () => {
    expect(countNewlines('a\n')).toBe(1);
  });

  it('should return 3 when the text is three newlines', () => {
    expect(countNewlines('\n\n\n')).toBe(3);
  });

  it('should return 2 when the text is a three-line comment', () => {
    expect(countNewlines('/*!\n * oen\n */')).toBe(2);
  });
});

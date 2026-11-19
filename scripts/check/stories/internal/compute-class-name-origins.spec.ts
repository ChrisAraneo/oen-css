import { describe, expect, it } from 'vitest';
import { computeClassNameOrigins } from './compute-class-name-origins.ts';

describe('computeClassNameOrigins', () => {
  it('should return each class with its origin when two classes are used once each', () => {
    expect(
      computeClassNameOrigins([
        { className: 'button', origin: 'a.js' },
        { className: 'title', origin: 'b.js' },
      ]),
    ).toEqual({ button: ['a.js'], title: ['b.js'] });
  });

  it('should return both origins when the same class is used in two files', () => {
    expect(
      computeClassNameOrigins([
        { className: 'button', origin: 'a.js' },
        { className: 'button', origin: 'b.js' },
      ]),
    ).toEqual({ button: ['a.js', 'b.js'] });
  });

  it('should return the origin once when the same class and origin repeat', () => {
    expect(
      computeClassNameOrigins([
        { className: 'button', origin: 'a.js' },
        { className: 'button', origin: 'a.js' },
      ]),
    ).toEqual({ button: ['a.js'] });
  });

  it('should return an empty object when there are no usages', () => {
    expect(computeClassNameOrigins([])).toEqual({});
  });

  it('should return one key per class when a class is used twice', () => {
    expect(
      Object.keys(
        computeClassNameOrigins([
          { className: 'a', origin: 'x' },
          { className: 'b', origin: 'x' },
          { className: 'a', origin: 'y' },
        ]),
      ),
    ).toEqual(['a', 'b']);
  });
});

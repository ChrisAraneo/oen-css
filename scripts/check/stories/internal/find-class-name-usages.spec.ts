import { describe, expect, it } from 'vitest';
import { findClassNameUsages } from './find-class-name-usages.ts';

describe('findClassNameUsages', () => {
  it('should return the class with its origin when the markup has one class', () => {
    expect(
      findClassNameUsages('<a class="button">x</a>', 'stories/a.js'),
    ).toEqual([{ className: 'button', origin: 'stories/a.js' }]);
  });

  it('should return both classes when the class attribute holds two', () => {
    expect(
      findClassNameUsages('<a class="button is-primary">x</a>', 'a'),
    ).toEqual([
      { className: 'button', origin: 'a' },
      { className: 'is-primary', origin: 'a' },
    ]);
  });

  it('should return the classes of both elements when the markup has two', () => {
    expect(
      findClassNameUsages(
        '<a class="button"></a><p class="title"></p>',
        'a',
      ).map(({ className }) => className),
    ).toEqual(['button', 'title']);
  });

  it('should return an empty array when the class attribute still holds a placeholder', () => {
    expect(
      findClassNameUsages('<a class="button is-${size}">x</a>', 'a'),
    ).toEqual([]);
  });

  it('should return both classes when the class attribute has extra whitespace', () => {
    expect(
      findClassNameUsages('<a class="  button   is-primary  ">x</a>', 'a').map(
        ({ className }) => className,
      ),
    ).toEqual(['button', 'is-primary']);
  });

  it('should return an empty array when the markup has no class attribute', () => {
    expect(findClassNameUsages('<a href="#">x</a>', 'a')).toEqual([]);
  });

  it('should return an empty array when the class attribute is empty', () => {
    expect(findClassNameUsages('<a class="">x</a>', 'a')).toEqual([]);
  });

  it('should return two usages when the same class is used by two elements', () => {
    expect(
      findClassNameUsages('<a class="button"></a><b class="button"></b>', 'a'),
    ).toHaveLength(2);
  });
});

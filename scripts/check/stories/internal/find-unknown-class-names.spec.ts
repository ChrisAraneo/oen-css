import { describe, expect, it } from 'vitest';
import type { Gallery } from '../types/gallery.ts';
import { findUnknownClassNames } from './find-unknown-class-names.ts';

const file = (text: string) => ({ path: 'p', text, issue: undefined });

const GALLERY: Gallery = {
  renderedStories: [],
  sources: [],
  stylesheet: file('.button{color:red}'),
  storyOnlyStylesheet: file('.sb-swatch{color:red}'),
};

describe('findUnknownClassNames', () => {
  it('should return the class with its origin and reason when no stylesheet declares it', () => {
    expect(findUnknownClassNames({ buton: ['a.js'] }, GALLERY)).toEqual([
      { className: 'buton', origins: ['a.js'], reason: 'not in oen.css' },
    ]);
  });

  it('should return an empty array when both stylesheets declare the classes used', () => {
    expect(
      findUnknownClassNames(
        { button: ['a.js'], 'sb-swatch': ['b.js'] },
        GALLERY,
      ),
    ).toEqual([]);
  });

  it('should return an empty array when the class is a Font Awesome icon class', () => {
    expect(findUnknownClassNames({ 'fa-home': ['a.js'] }, GALLERY)).toEqual([]);
  });

  it('should return an empty array when the class is `dropdown-trigger`', () => {
    expect(
      findUnknownClassNames({ 'dropdown-trigger': ['a.js'] }, GALLERY),
    ).toEqual([]);
  });

  it('should return the findings sorted by class name when two classes are unknown', () => {
    expect(
      findUnknownClassNames({ zebra: ['a.js'], apple: ['a.js'] }, GALLERY).map(
        ({ className }) => className,
      ),
    ).toEqual(['apple', 'zebra']);
  });

  it('should return an empty array when no class was used', () => {
    expect(findUnknownClassNames({}, GALLERY)).toEqual([]);
  });
});

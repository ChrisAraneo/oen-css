import { describe, expect, it } from 'vitest';
import { filterMissingDeclarations } from './filter-missing-declarations.ts';

describe('filterMissingDeclarations', () => {
  it('should return the missing declaration when one of two is missing', () => {
    expect(
      filterMissingDeclarations('--oen-primary-rgb: 1, 2, 3;', [
        '--oen-primary-rgb: 1, 2, 3;',
        '--oen-link-rgb: 4, 5, 6;',
      ]),
    ).toEqual(['--oen-link-rgb: 4, 5, 6;']);
  });

  it('should return an empty array when the stylesheet carries every declaration', () => {
    expect(
      filterMissingDeclarations('.button{}.navbar{}', ['.button', '.navbar']),
    ).toEqual([]);
  });

  it('should return every declaration when the stylesheet is empty', () => {
    expect(filterMissingDeclarations('', ['.button'])).toEqual(['.button']);
  });

  it('should return an empty array when no declaration is expected', () => {
    expect(filterMissingDeclarations('.button{}', [])).toEqual([]);
  });

  it('should return an empty array when the declaration is on a later line', () => {
    expect(
      filterMissingDeclarations('body{}\n.button{color:red}', ['.button']),
    ).toEqual([]);
  });

  it('should return the declaration when the stylesheet spaces it differently', () => {
    expect(
      filterMissingDeclarations('--oen-primary-rgb:1,2,3;', [
        '--oen-primary-rgb: 1, 2, 3;',
      ]),
    ).toEqual(['--oen-primary-rgb: 1, 2, 3;']);
  });
});

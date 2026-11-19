import { describe, expect, it } from 'vitest';
import { filterLeftoverBulmaIdentifiers } from './filter-leftover-bulma-identifiers.ts';

describe('filterLeftoverBulmaIdentifiers', () => {
  it('should return the file, the line number, and the line when an identifier is left over', () => {
    expect(
      filterLeftoverBulmaIdentifiers('body {}\n--bulma-a: 1;', 'oen.css'),
    ).toEqual(['  oen.css:2: --bulma-a: 1;']);
  });

  it('should return an empty array when the only bulma references are in the banner', () => {
    expect(
      filterLeftoverBulmaIdentifiers(
        '/*! built from Bulma v1.0.4 | https://bulma.io */\nbody {}',
        'oen.css',
      ),
    ).toEqual([]);
  });

  it('should return an empty array when the multi-line banner follows a charset declaration', () => {
    expect(
      filterLeftoverBulmaIdentifiers(
        '@charset "UTF-8";\n/*!\n * Built from Bulma\n */\nbody {}',
        'oen.css',
      ),
    ).toEqual([]);
  });

  it('should return the real line number when the leftover follows a multi-line banner', () => {
    expect(
      filterLeftoverBulmaIdentifiers(
        '/*!\n * Bulma\n */\nbody {}\n--bulma-a: 1;',
        'oen.css',
      ),
    ).toEqual(['  oen.css:5: --bulma-a: 1;']);
  });

  it('should return an empty array when the stylesheet was fully renamed', () => {
    expect(
      filterLeftoverBulmaIdentifiers('--oen-a: 1;\n.button {}', 'oen.css'),
    ).toEqual([]);
  });

  it('should return two references when two identifiers are left over', () => {
    expect(
      filterLeftoverBulmaIdentifiers('--bulma-a: 1;\n--bulma-b: 2;', 'oen.css'),
    ).toHaveLength(2);
  });
});

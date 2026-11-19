import { describe, expect, it } from 'vitest';
import { countMatches } from './count-matches.ts';

describe('countMatches', () => {
  it('should return 3 when the global pattern matches three times', () => {
    expect(countMatches('a-b-c-', /-/g)).toBe(3);
  });

  it('should return 0 when the pattern does not match', () => {
    expect(countMatches('body {}', /--oen-/g)).toBe(0);
  });

  it('should return 0 when the text is empty', () => {
    expect(countMatches('', /./g)).toBe(0);
  });

  it('should return 2 when the text declares two custom properties', () => {
    expect(countMatches(':root{--oen-a:1;--oen-b:2}', /--oen-/g)).toBe(2);
  });

  it('should return 2 when the pattern is not global and has one capture group', () => {
    expect(countMatches('ab', /a(b)/)).toBe(2);
  });
});

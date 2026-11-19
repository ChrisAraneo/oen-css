import { describe, expect, it } from 'vitest';
import { toSassPrefix } from './to-sass-prefix.ts';

describe('toSassPrefix', () => {
  it('should return `oen-` when called with `--oen-`', () => {
    expect(toSassPrefix('--oen-')).toBe('oen-');
  });

  it('should return `bulma-` when called with `--bulma-`', () => {
    expect(toSassPrefix('--bulma-')).toBe('bulma-');
  });

  it('should return the prefix unchanged when it has no marker', () => {
    expect(toSassPrefix('oen-')).toBe('oen-');
  });

  it('should return `--oen-` when called with `----oen-`', () => {
    expect(toSassPrefix('----oen-')).toBe('--oen-');
  });

  it('should return an empty string when the prefix is empty', () => {
    expect(toSassPrefix('')).toBe('');
  });
});

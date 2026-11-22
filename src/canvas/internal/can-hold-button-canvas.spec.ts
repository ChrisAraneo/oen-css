import { describe, expect, it } from 'vitest';
import { canHoldButtonCanvas } from './can-hold-button-canvas.ts';

describe('canHoldButtonCanvas', () => {
  it('should return `true` when the tag name is `BUTTON`', () => {
    expect(canHoldButtonCanvas('BUTTON')).toBe(true);
  });

  it('should return `true` when the tag name is `A`', () => {
    expect(canHoldButtonCanvas('A')).toBe(true);
  });

  it('should return `false` when the tag name is `INPUT`', () => {
    expect(canHoldButtonCanvas('INPUT')).toBe(false);
  });

  it('should return `false` when the tag name is lowercase `input`', () => {
    expect(canHoldButtonCanvas('input')).toBe(false);
  });

  it('should return `true` when the tag name is an empty string', () => {
    expect(canHoldButtonCanvas('')).toBe(true);
  });
});

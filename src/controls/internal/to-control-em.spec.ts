import { describe, expect, it } from 'vitest';
import { toControlEm } from './to-control-em.ts';

describe('toControlEm', () => {
  it('should return `0.6429em` when called with the 9 pixel button padding', () => {
    expect(toControlEm(9)).toBe('0.6429em');
  });

  it('should return `1.4286em` when called with the 20 pixel button padding', () => {
    expect(toControlEm(20)).toBe('1.4286em');
  });

  it('should return `1em` when called with the 14 pixel control font size', () => {
    expect(toControlEm(14)).toBe('1em');
  });

  it('should return a value in em when called with 9 pixels', () => {
    expect(toControlEm(9).endsWith('em')).toBe(true);
  });

  it('should return `0em` when called with 0 pixels', () => {
    expect(toControlEm(0)).toBe('0em');
  });
});

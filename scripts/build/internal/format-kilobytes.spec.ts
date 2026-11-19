import { describe, expect, it } from 'vitest';
import { formatKilobytes } from './format-kilobytes.ts';

describe('formatKilobytes', () => {
  it('should return `1.0` when called with 1024 bytes', () => {
    expect(formatKilobytes(1024)).toBe('1.0');
  });

  it('should return `1.5` when called with 1536 bytes', () => {
    expect(formatKilobytes(1536)).toBe('1.5');
  });

  it('should return `0.0` when called with 0 bytes', () => {
    expect(formatKilobytes(0)).toBe('0.0');
  });

  it('should return `1.1` when the value rounds to one decimal place', () => {
    expect(formatKilobytes(1124)).toBe('1.1');
  });

  it('should return `713.5` when called with a stylesheet sized value', () => {
    expect(formatKilobytes(730624)).toBe('713.5');
  });

  it('should return `2.0` when the value is a whole number of kilobytes', () => {
    expect(formatKilobytes(2048)).toBe('2.0');
  });
});

import { describe, expect, it } from 'vitest';
import { toRgbChannels } from './to-rgb-channels.ts';

describe('toRgbChannels', () => {
  it('should return three channels when called with a six digit hex color', () => {
    expect(toRgbChannels('#2DE583')).toEqual([45, 229, 131]);
  });

  it('should return three channels when the hex has no leading hash', () => {
    expect(toRgbChannels('2DE583')).toEqual([45, 229, 131]);
  });

  it('should return three channels when the hex digits are lower case', () => {
    expect(toRgbChannels('#2de583')).toEqual([45, 229, 131]);
  });

  it('should return `0` and `255` channels when the hex is black or white', () => {
    expect(toRgbChannels('#000000')).toEqual([0, 0, 0]);
    expect(toRgbChannels('#ffffff')).toEqual([255, 255, 255]);
  });

  it('should return an empty array when the hex is an empty string', () => {
    expect(toRgbChannels('')).toEqual([]);
  });

  it('should return one channel when the hex has three digits', () => {
    expect(toRgbChannels('#abc')).toEqual([171]);
  });
});

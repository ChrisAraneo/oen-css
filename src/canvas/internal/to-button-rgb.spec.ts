import { describe, expect, it } from 'vitest';
import { toButtonRgb } from './to-button-rgb.ts';

describe('toButtonRgb', () => {
  it('should return the three channels when the color is an rgb triple', () => {
    expect(toButtonRgb('rgb(72, 95, 199)')).toEqual({
      red: 72,
      green: 95,
      blue: 199,
      alpha: 1,
    });
  });

  it('should return the alpha when the color carries one', () => {
    expect(toButtonRgb('rgba(72, 95, 199, 0.5)')).toEqual({
      red: 72,
      green: 95,
      blue: 199,
      alpha: 0.5,
    });
  });

  it('should return no alpha loss when the color is fully transparent', () => {
    expect(toButtonRgb('rgba(0, 0, 0, 0)')).toEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    });
  });

  it('should return the three channels when the color uses the space separated form', () => {
    expect(toButtonRgb('rgb(72 95 199)')).toEqual({
      red: 72,
      green: 95,
      blue: 199,
      alpha: 1,
    });
  });

  it('should return nothing when the color names fewer than three channels', () => {
    expect(toButtonRgb('rgb(72, 95)')).toBeUndefined();
  });

  it('should return nothing when the color is a keyword', () => {
    expect(toButtonRgb('transparent')).toBeUndefined();
  });

  it('should return nothing when the color is empty', () => {
    expect(toButtonRgb('')).toBeUndefined();
  });
});

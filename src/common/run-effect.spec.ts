import { describe, expect, it, vi } from 'vitest';
import { runEffect } from './run-effect.ts';

describe('runEffect', () => {
  it('should return the given value when the effect runs', () => {
    expect(runEffect('value', vi.fn())).toBe('value');
  });

  it('should pass the given value to the effect when the effect runs', () => {
    const effect = vi.fn();
    runEffect({ a: 1 }, effect);

    expect(effect).toHaveBeenCalledWith({ a: 1 });
  });

  it('should call the effect once when the effect runs', () => {
    const effect = vi.fn();
    runEffect('value', effect);

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should return the given value when it is `false` or `0`', () => {
    expect(runEffect(false, vi.fn())).toBe(false);
    expect(runEffect(0, vi.fn())).toBe(0);
  });

  it('should return the given value when the effect returns `undefined`', () => {
    expect(runEffect('value', () => undefined)).toBe('value');
  });

  it('should return the same array when called with one', () => {
    const outcomes = [{ succeeded: true }];

    expect(runEffect(outcomes, vi.fn())).toBe(outcomes);
  });
});

import { describe, expect, it } from 'vitest';
import { hasFailedStep } from './has-failed-step.ts';

describe('hasFailedStep', () => {
  it('should return `true` when one of two outcomes failed', () => {
    expect(
      hasFailedStep([
        { name: 'format', succeeded: true },
        { name: 'typecheck', succeeded: false },
      ]),
    ).toBe(true);
  });

  it('should return `false` when every outcome succeeded', () => {
    expect(
      hasFailedStep([
        { name: 'format', succeeded: true },
        { name: 'typecheck', succeeded: true },
      ]),
    ).toBe(false);
  });

  it('should return `false` when there are no outcomes', () => {
    expect(hasFailedStep([])).toBe(false);
  });

  it('should return `true` when the only outcome failed', () => {
    expect(hasFailedStep([{ name: 'format', succeeded: false }])).toBe(true);
  });
});

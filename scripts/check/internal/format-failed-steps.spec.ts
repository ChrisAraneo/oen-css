import { describe, expect, it } from 'vitest';
import { formatFailedSteps } from './format-failed-steps.ts';

describe('formatFailedSteps', () => {
  it('should return a line naming the failed step when one step failed', () => {
    expect(
      formatFailedSteps([
        { name: 'format', succeeded: true },
        { name: 'typecheck', succeeded: false },
      ]),
    ).toEqual(['failed: typecheck']);
  });

  it('should return every failed step in order when two steps failed', () => {
    expect(
      formatFailedSteps([
        { name: 'format', succeeded: false },
        { name: 'typecheck', succeeded: false },
      ]),
    ).toEqual(['failed: format, typecheck']);
  });

  it('should return an empty array when every step succeeded', () => {
    expect(formatFailedSteps([{ name: 'format', succeeded: true }])).toEqual(
      [],
    );
  });

  it('should return an empty array when no step ran', () => {
    expect(formatFailedSteps([])).toEqual([]);
  });

  it('should return one line when three steps failed', () => {
    expect(
      formatFailedSteps([
        { name: 'a', succeeded: false },
        { name: 'b', succeeded: false },
        { name: 'c', succeeded: false },
      ]),
    ).toHaveLength(1);
  });
});

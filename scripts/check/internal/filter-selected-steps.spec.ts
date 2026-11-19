import { describe, expect, it } from 'vitest';
import { filterSelectedSteps } from './filter-selected-steps.ts';
import type { CheckStep } from './types/check-step.ts';

const run = () => Promise.resolve(true);

const STEPS: readonly CheckStep[] = [
  { name: 'format', flag: '--format', run },
  { name: 'typecheck', flag: '--types', run },
  { name: 'build', flag: '--build', run },
];

describe('filterSelectedSteps', () => {
  it('should return the step named by the flag when one flag is given', () => {
    expect(filterSelectedSteps(STEPS, ['--types'])).toEqual([
      { name: 'typecheck', flag: '--types', run },
    ]);
  });

  it('should return the selected steps in pipeline order when two flags are given', () => {
    expect(
      filterSelectedSteps(STEPS, ['--build', '--format']).map(
        ({ name }) => name,
      ),
    ).toEqual(['format', 'build']);
  });

  it('should return every step when no flag is given', () => {
    expect(filterSelectedSteps(STEPS, [])).toBe(STEPS);
  });

  it('should return every step when the arguments name no known step', () => {
    expect(filterSelectedSteps(STEPS, ['node', 'check.ts'])).toBe(STEPS);
  });

  it('should return one step when the flag is last in the arguments', () => {
    expect(
      filterSelectedSteps(STEPS, ['node', 'check.ts', '--types']),
    ).toHaveLength(1);
  });

  it('should return an empty array when there are no steps', () => {
    expect(filterSelectedSteps([], ['--types'])).toEqual([]);
  });
});

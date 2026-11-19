import { range } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { formatCustomPropertyIssue } from './format-custom-property-issue.ts';

const REQUIRED: readonly string[] = [
  '--oen-primary',
  '--oen-scheme-main',
  '--oen-radius',
  '--oen-family-primary',
];

const padding = (count: number): readonly string[] =>
  range(count).map((index) => `--oen-generated-${index}`);

const complete = (): readonly string[] => [...REQUIRED, ...padding(500)];

describe('formatCustomPropertyIssue', () => {
  it('should return `undefined` when the set carries 500 properties and the required ones', () => {
    expect(formatCustomPropertyIssue(complete())).toBe(undefined);
  });

  it('should return the count issue when the set carries only four properties', () => {
    expect(formatCustomPropertyIssue(REQUIRED)).toBe(
      'expected at least 500 --oen-* declarations, found 4',
    );
  });

  it('should return the count issue when the set is empty', () => {
    expect(formatCustomPropertyIssue([])).toContain(
      'expected at least 500 --oen-* declarations, found 0',
    );
  });

  it('should return the missing properties when none of the required ones are declared', () => {
    expect(formatCustomPropertyIssue(padding(600))).toBe(
      'expected these properties to be declared: --oen-primary, --oen-scheme-main, --oen-radius, --oen-family-primary',
    );
  });

  it('should return only `--oen-family-primary` when the other required ones are declared', () => {
    expect(
      formatCustomPropertyIssue([
        '--oen-primary',
        '--oen-scheme-main',
        '--oen-radius',
        ...padding(500),
      ]),
    ).toBe('expected these properties to be declared: --oen-family-primary');
  });

  it('should return the count issue first when the set is small and incomplete', () => {
    expect(formatCustomPropertyIssue(['--oen-primary'])).toContain(
      'expected at least 500',
    );
  });
});

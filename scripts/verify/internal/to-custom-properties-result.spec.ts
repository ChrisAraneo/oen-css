import { range } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { toCustomPropertiesResult } from './to-custom-properties-result.ts';

const complete = (): readonly string[] => [
  '--oen-primary',
  '--oen-scheme-main',
  '--oen-radius',
  '--oen-family-primary',
  ...range(500).map((index) => `--oen-generated-${index}`),
];

describe('toCustomPropertiesResult', () => {
  it('should return the check name when called with the declared properties', () => {
    expect(toCustomPropertiesResult(complete()).name).toBe(
      'custom properties are namespaced with --oen-',
    );
  });

  it('should return `504 distinct properties` as the detail when 504 were declared', () => {
    expect(toCustomPropertiesResult(complete()).detail).toBe(
      '504 distinct properties',
    );
  });

  it('should return `undefined` as the issue when the set is complete', () => {
    expect(toCustomPropertiesResult(complete()).issue).toBe(undefined);
  });

  it('should return the count issue when only one property was declared', () => {
    expect(toCustomPropertiesResult(['--oen-primary']).issue).toContain(
      'expected at least 500',
    );
  });

  it('should return `0 distinct properties` as the detail when the set is empty', () => {
    expect(toCustomPropertiesResult([]).detail).toBe('0 distinct properties');
  });
});

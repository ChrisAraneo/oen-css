import { describe, expect, it } from 'vitest';
import { formatConfiguration } from './format-configuration.ts';

describe('formatConfiguration', () => {
  it('should return the variables separated by a comma and a newline when called with two', () => {
    expect(formatConfiguration(['$a: 1', '$b: 2'])).toBe('$a: 1,\n$b: 2');
  });

  it('should return the variable alone when called with one', () => {
    expect(formatConfiguration(['$a: 1'])).toBe('$a: 1');
  });

  it('should return an empty string when called with no variable', () => {
    expect(formatConfiguration([])).toBe('');
  });

  it('should not return a trailing comma when called with two variables', () => {
    expect(formatConfiguration(['$a: 1', '$b: 2']).endsWith(',')).toBe(false);
  });

  it('should return the indentation unchanged when the variables are indented', () => {
    expect(formatConfiguration(['  $a: 1', '  $b: 2'])).toBe(
      '  $a: 1,\n  $b: 2',
    );
  });
});

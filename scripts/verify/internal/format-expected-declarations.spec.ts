import { describe, expect, it } from 'vitest';
import { formatExpectedDeclarations } from './format-expected-declarations.ts';

describe('formatExpectedDeclarations', () => {
  it('should return the declaration prefixed with `expected:` when one is missing', () => {
    expect(formatExpectedDeclarations(['--oen-primary-rgb: 1, 2, 3;'])).toBe(
      '  expected: --oen-primary-rgb: 1, 2, 3;',
    );
  });

  it('should return one line per declaration when two are missing', () => {
    expect(formatExpectedDeclarations(['a', 'b'])).toBe(
      '  expected: a\n  expected: b',
    );
  });

  it('should return an empty string when no declaration is missing', () => {
    expect(formatExpectedDeclarations([])).toBe('');
  });

  it('should return a line indented by two spaces when one declaration is missing', () => {
    expect(formatExpectedDeclarations(['a']).startsWith('  ')).toBe(true);
  });
});

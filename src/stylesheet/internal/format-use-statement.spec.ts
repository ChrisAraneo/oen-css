import { describe, expect, it } from 'vitest';
import { formatUseStatement } from './format-use-statement.ts';

describe('formatUseStatement', () => {
  it('should return the configuration inside a `@use` statement when called with one variable', () => {
    expect(formatUseStatement('  $a: 1')).toBe(
      '@use "pkg:bulma/sass" with (\n  $a: 1\n);\n',
    );
  });

  it('should return the Bulma package url when called with an empty configuration', () => {
    expect(formatUseStatement('')).toContain('"pkg:bulma/sass"');
  });

  it('should return a statement that ends with a newline when called with one variable', () => {
    expect(formatUseStatement('  $a: 1').endsWith('\n')).toBe(true);
  });

  it('should return a statement closed with a semicolon when called with one variable', () => {
    expect(formatUseStatement('  $a: 1')).toContain('\n);');
  });

  it('should return the configuration between the parentheses when it spans two lines', () => {
    expect(formatUseStatement('  $a: 1,\n  $b: 2')).toBe(
      '@use "pkg:bulma/sass" with (\n  $a: 1,\n  $b: 2\n);\n',
    );
  });
});

import { describe, expect, it } from 'vitest';
import { formatMinifiedStylesheetIssue } from './format-minified-stylesheet-issue.ts';

describe('formatMinifiedStylesheetIssue', () => {
  it('should return `undefined` when the minified stylesheet is smaller and balanced', () => {
    expect(
      formatMinifiedStylesheetIssue('body { color: red; }', 'body{color:red}'),
    ).toBe(undefined);
  });

  it('should return the size issue when the minified stylesheet is the same size', () => {
    expect(formatMinifiedStylesheetIssue('a{}', 'a{}')).toBe(
      'oen.min.css is not smaller than oen.css',
    );
  });

  it('should return the size issue when the minified stylesheet is larger', () => {
    expect(formatMinifiedStylesheetIssue('a{}', 'a{} b{}')).toContain(
      'is not smaller',
    );
  });

  it('should return the braces issue when the minified stylesheet is truncated', () => {
    expect(formatMinifiedStylesheetIssue('body { color: red; }', 'body{')).toBe(
      'oen.min.css has unbalanced braces',
    );
  });

  it('should return the size issue first when both are wrong', () => {
    expect(formatMinifiedStylesheetIssue('a{', 'a{')).toContain(
      'is not smaller',
    );
  });

  it('should return `undefined` when the nested braces balance', () => {
    expect(
      formatMinifiedStylesheetIssue(
        '@media screen { body { color: red; } }',
        '@media screen{body{color:red}}',
      ),
    ).toBe(undefined);
  });
});

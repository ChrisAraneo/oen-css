import { describe, expect, it } from 'vitest';
import { formatMinifyIssue } from './format-minify-issue.ts';

describe('formatMinifyIssue', () => {
  it('should return `undefined` when clean-css reported no error', () => {
    expect(formatMinifyIssue([], 'oen.min.css')).toBe(undefined);
  });

  it('should return the file name and the error when clean-css reported one error', () => {
    expect(formatMinifyIssue(['broken syntax'], 'oen.min.css')).toBe(
      'clean-css failed on oen.min.css:\nbroken syntax',
    );
  });

  it('should return one line per error when clean-css reported two errors', () => {
    expect(formatMinifyIssue(['first', 'second'], 'oen.min.css')).toBe(
      'clean-css failed on oen.min.css:\nfirst\nsecond',
    );
  });

  it('should return the given file name when another file was minified', () => {
    expect(formatMinifyIssue(['x'], 'other.css')).toContain(
      'failed on other.css',
    );
  });
});

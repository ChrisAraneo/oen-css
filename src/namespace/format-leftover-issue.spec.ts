import { describe, expect, it } from 'vitest';
import { formatLeftoverIssue } from './format-leftover-issue.ts';

describe('formatLeftoverIssue', () => {
  it('should return `undefined` when nothing leaked', () => {
    expect(formatLeftoverIssue([], 'oen.css')).toBe(undefined);
  });

  it('should return the identifier count when one identifier leaked', () => {
    expect(
      formatLeftoverIssue(['  oen.css:1: --bulma-a'], 'oen.css'),
    ).toContain('Found 1 "bulma" identifier(s)');
  });

  it('should return an issue naming `oen.min.css` when that file leaked', () => {
    expect(
      formatLeftoverIssue(['  oen.min.css:1: --bulma-a'], 'oen.min.css'),
    ).toContain('oen.min.css');
  });

  it('should return the leftover reference in the issue when one identifier leaked', () => {
    expect(
      formatLeftoverIssue(['  oen.css:9: --bulma-a'], 'oen.css'),
    ).toContain('  oen.css:9: --bulma-a');
  });
});

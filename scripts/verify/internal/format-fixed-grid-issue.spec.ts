import { describe, expect, it } from 'vitest';
import { formatFixedGridIssue } from './format-fixed-grid-issue.ts';

describe('formatFixedGridIssue', () => {
  it('should return `undefined` when the container is named and queried ten times', () => {
    expect(formatFixedGridIssue('container-name: oen-fixed-grid', 10)).toBe(
      undefined,
    );
  });

  it('should return the container name issue when the stylesheet does not declare it', () => {
    expect(formatFixedGridIssue('body{}', 10)).toBe(
      'expected `container-name: oen-fixed-grid`',
    );
  });

  it('should return the query issue when the query count is 0', () => {
    expect(formatFixedGridIssue('container-name: oen-fixed-grid', 0)).toBe(
      'expected @container queries against oen-fixed-grid',
    );
  });

  it('should return the container name issue first when both are missing', () => {
    expect(formatFixedGridIssue('body{}', 0)).toContain('container-name');
  });

  it('should return `undefined` when the query count is 1', () => {
    expect(formatFixedGridIssue('container-name: oen-fixed-grid', 1)).toBe(
      undefined,
    );
  });

  it('should return an issue when the container is still named `bulma-fixed-grid`', () => {
    expect(
      formatFixedGridIssue('container-name: bulma-fixed-grid', 10),
    ).toContain('expected');
  });
});

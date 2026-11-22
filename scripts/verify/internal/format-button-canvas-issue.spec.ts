import { describe, expect, it } from 'vitest';
import { formatButtonCanvasIssue } from './format-button-canvas-issue.ts';

describe('formatButtonCanvasIssue', () => {
  it('should return `undefined` when nothing is missing', () => {
    expect(formatButtonCanvasIssue([])).toBe(undefined);
  });

  it('should return the stylesheet name when something is missing', () => {
    expect(formatButtonCanvasIssue(['oen-button-canvas'])).toContain('oen.css');
  });

  it('should return every missing fragment when several are missing', () => {
    const issue = formatButtonCanvasIssue(['first', 'second']);

    expect(issue).toContain('expected: first');
    expect(issue).toContain('expected: second');
  });
});

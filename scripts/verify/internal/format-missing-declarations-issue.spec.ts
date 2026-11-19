import { describe, expect, it } from 'vitest';
import { formatMissingDeclarationsIssue } from './format-missing-declarations-issue.ts';

describe('formatMissingDeclarationsIssue', () => {
  it('should return `undefined` when no declaration is missing', () => {
    expect(formatMissingDeclarationsIssue([])).toBe(undefined);
  });

  it('should return an issue saying the stylesheet does not carry the theme when a declaration is missing', () => {
    expect(
      formatMissingDeclarationsIssue(['--oen-primary-rgb: 1, 2, 3;']),
    ).toContain('does not carry the theme declared in');
  });

  it('should return an issue naming the three theme modules when a declaration is missing', () => {
    const issue = formatMissingDeclarationsIssue(['x']);

    expect(issue).toContain('src/colors/');
    expect(issue).toContain('src/fonts/');
    expect(issue).toContain('src/typography/');
  });

  it('should return the expected declaration when one is missing', () => {
    expect(formatMissingDeclarationsIssue(['--oen-a: 1;'])).toContain(
      '  expected: --oen-a: 1;',
    );
  });

  it('should return an issue naming what `src/stylesheet/` passes to Bulma when a declaration is missing', () => {
    expect(formatMissingDeclarationsIssue(['x'])).toContain(
      'src/stylesheet/ passes to Bulma',
    );
  });
});

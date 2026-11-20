import { describe, expect, it } from 'vitest';
import { formatLeftoverBulmaIssue } from './format-leftover-bulma-issue.ts';

const file = (text: string, path = 'C:/repo/oen.css') => ({
  path,
  text,
  issue: undefined,
});

describe('formatLeftoverBulmaIssue', () => {
  it('should return `undefined` when the stylesheet is fully renamed', () => {
    expect(formatLeftoverBulmaIssue(file('--oen-primary: red;'))).toBe(
      undefined,
    );
  });

  it('should return the custom property issue when the stylesheet declares `--bulma-primary`', () => {
    expect(formatLeftoverBulmaIssue(file('--bulma-primary: red;'))).toBe(
      'oen.css still contains --bulma- custom properties',
    );
  });

  it('should return the identifier count when a bulma class name is left over', () => {
    expect(formatLeftoverBulmaIssue(file('.bulma-thing{color:red}'))).toContain(
      'Found 1 "bulma" identifier(s)',
    );
  });

  it('should return `undefined` when the only bulma references are in the banner', () => {
    expect(
      formatLeftoverBulmaIssue(
        file('/*! Built from Bulma v1.0.4 | https://bulma.io */\nbody{}'),
      ),
    ).toBe(undefined);
  });

  it('should return an issue naming `oen.min.css` when that file is checked', () => {
    expect(
      formatLeftoverBulmaIssue(file('--bulma-a: 1;', 'C:/repo/oen.min.css')),
    ).toContain('oen.min.css');
  });

  it('should return the custom property issue first when both leaks are present', () => {
    expect(
      formatLeftoverBulmaIssue(file('--bulma-a: 1;\n.bulma-thing{}')),
    ).toContain('still contains --bulma- custom properties');
  });
});

import { describe, expect, it } from 'vitest';
import { formatOenLicenseIssue } from './format-oen-license-issue.ts';

describe('formatOenLicenseIssue', () => {
  it('should return `undefined` when the shipped license matches the repository one', () => {
    expect(formatOenLicenseIssue('MIT License', 'MIT License')).toBe(undefined);
  });

  it('should return the difference issue when the shipped license differs', () => {
    expect(formatOenLicenseIssue('MIT License', 'Apache License')).toBe(
      'dist/LICENSE differs from the repository LICENSE',
    );
  });

  it('should return the difference issue when only the trailing whitespace differs', () => {
    expect(formatOenLicenseIssue('MIT License\n', 'MIT License')).toContain(
      'differs',
    );
  });

  it('should return the difference issue when the shipped license is empty', () => {
    expect(formatOenLicenseIssue('', 'MIT License')).toContain('differs');
  });

  it('should return `undefined` when both licenses are empty', () => {
    expect(formatOenLicenseIssue('', '')).toBe(undefined);
  });
});

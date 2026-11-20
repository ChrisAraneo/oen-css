import { describe, expect, it } from 'vitest';
import { formatMissingPackageFilesIssue } from './format-missing-package-files-issue.ts';

describe('formatMissingPackageFilesIssue', () => {
  it('should return `undefined` when every artifact is present', () => {
    expect(formatMissingPackageFilesIssue([])).toBe(undefined);
  });

  it('should return the missing artifact and the build command when one is missing', () => {
    expect(formatMissingPackageFilesIssue(['oen.css'])).toBe(
      'missing from the package root: oen.css. Run `npm run build`',
    );
  });

  it('should return both artifacts when two are missing', () => {
    expect(formatMissingPackageFilesIssue(['oen.css', 'LICENSE'])).toContain(
      'oen.css, LICENSE',
    );
  });

  it('should return an issue naming `npm run build` when an artifact is missing', () => {
    expect(formatMissingPackageFilesIssue(['oen.css'])).toContain(
      'npm run build',
    );
  });
});

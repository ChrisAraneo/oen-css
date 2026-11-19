import { describe, expect, it } from 'vitest';
import { formatMissingDistFilesIssue } from './format-missing-dist-files-issue.ts';

describe('formatMissingDistFilesIssue', () => {
  it('should return `undefined` when every artifact is present', () => {
    expect(formatMissingDistFilesIssue([])).toBe(undefined);
  });

  it('should return the missing artifact and the build command when one is missing', () => {
    expect(formatMissingDistFilesIssue(['oen.css'])).toBe(
      'missing from dist/: oen.css. Run `npm run build`',
    );
  });

  it('should return both artifacts when two are missing', () => {
    expect(formatMissingDistFilesIssue(['oen.css', 'LICENSE'])).toContain(
      'oen.css, LICENSE',
    );
  });

  it('should return an issue naming `npm run build` when an artifact is missing', () => {
    expect(formatMissingDistFilesIssue(['oen.css'])).toContain('npm run build');
  });
});

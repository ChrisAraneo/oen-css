import { relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPOSITORY_ROOT } from '../consts.ts';
import { formatUnreadableFileIssue } from './format-unreadable-file-issue.ts';

const DIST_STYLESHEET = resolve(REPOSITORY_ROOT, 'dist', 'oen.css');

describe('formatUnreadableFileIssue', () => {
  it('should return the relative path and the reason when the read failed', () => {
    expect(
      formatUnreadableFileIssue(DIST_STYLESHEET, new Error('ENOENT')),
    ).toBe(
      `${relative(REPOSITORY_ROOT, DIST_STYLESHEET)} could not be read: ENOENT`,
    );
  });

  it('should not return the repository root when the read failed', () => {
    expect(
      formatUnreadableFileIssue(DIST_STYLESHEET, new Error('x')),
    ).not.toContain(REPOSITORY_ROOT);
  });

  it('should return `Unknown error occurred` as the reason when the failure is a number', () => {
    expect(formatUnreadableFileIssue(DIST_STYLESHEET, 42)).toContain(
      'could not be read: Unknown error occurred',
    );
  });

  it('should return the string as the reason when a string was thrown', () => {
    expect(formatUnreadableFileIssue(DIST_STYLESHEET, 'denied')).toContain(
      'could not be read: denied',
    );
  });

  it('should return a message naming the file when the read failed', () => {
    expect(
      formatUnreadableFileIssue(DIST_STYLESHEET, new Error('x')),
    ).toContain('oen.css');
  });
});

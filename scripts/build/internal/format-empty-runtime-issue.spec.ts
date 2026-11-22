import { describe, expect, it } from 'vitest';
import {
  OEN_MINIFIED_RUNTIME,
  OEN_RUNTIME,
} from '../../common/package/consts.ts';
import { formatEmptyRuntimeIssue } from './format-empty-runtime-issue.ts';

describe('formatEmptyRuntimeIssue', () => {
  it('should return `undefined` when the code is not empty', () => {
    expect(formatEmptyRuntimeIssue('(()=>{})();', OEN_RUNTIME)).toBe(undefined);
  });

  it('should return the issue naming the file when the code is an empty string', () => {
    expect(formatEmptyRuntimeIssue('', OEN_RUNTIME)).toBe(
      'oen.js compiled to an empty bundle',
    );
  });

  it('should return the issue naming the minified file when the code is an empty string', () => {
    expect(formatEmptyRuntimeIssue('', OEN_MINIFIED_RUNTIME)).toBe(
      'oen.min.js compiled to an empty bundle',
    );
  });
});

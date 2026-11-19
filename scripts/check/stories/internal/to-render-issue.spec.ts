import { describe, expect, it } from 'vitest';
import { toRenderIssue } from './to-render-issue.ts';

describe('toRenderIssue', () => {
  it('should return no html and no issue when the error says `document is not defined`', () => {
    expect(toRenderIssue(new Error('document is not defined'))).toEqual({
      html: undefined,
      issue: undefined,
    });
  });

  it('should return no html and no issue when the error says `window is not defined`', () => {
    expect(toRenderIssue(new Error('window is not defined'))).toEqual({
      html: undefined,
      issue: undefined,
    });
  });

  it('should return the error message as the issue when the error is not browser-only', () => {
    expect(toRenderIssue(new Error('x is not a function'))).toEqual({
      html: undefined,
      issue: 'x is not a function',
    });
  });

  it('should return no issue when the browser-only error is inside a longer message', () => {
    expect(
      toRenderIssue(new Error('ReferenceError: document is not defined at x')),
    ).toEqual({ html: undefined, issue: undefined });
  });

  it('should return the thrown string as the issue when a string was thrown', () => {
    expect(toRenderIssue('broke').issue).toBe('broke');
  });

  it('should return `Unknown error occurred` when the thrown value has no message', () => {
    expect(toRenderIssue(42).issue).toBe('Unknown error occurred');
  });
});

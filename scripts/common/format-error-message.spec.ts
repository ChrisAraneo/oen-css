import { describe, expect, it } from 'vitest';
import { formatErrorMessage } from './format-error-message.ts';

describe('formatErrorMessage', () => {
  it('should return the error message when called with an `Error`', () => {
    expect(formatErrorMessage(new Error('boom'))).toBe('boom');
  });

  it('should return the error message when called with a `TypeError`', () => {
    expect(formatErrorMessage(new TypeError('wrong type'))).toBe('wrong type');
  });

  it('should return the string when called with a string', () => {
    expect(formatErrorMessage('just a string')).toBe('just a string');
  });

  it('should return `Unknown error occurred` when called with a number', () => {
    expect(formatErrorMessage(42)).toBe('Unknown error occurred');
  });

  it('should return `Unknown error occurred` when called with `undefined`', () => {
    expect(formatErrorMessage(undefined)).toBe('Unknown error occurred');
  });

  it('should return `Unknown error occurred` when called with a plain object', () => {
    expect(formatErrorMessage({ message: 'ignored' })).toBe(
      'Unknown error occurred',
    );
  });
});

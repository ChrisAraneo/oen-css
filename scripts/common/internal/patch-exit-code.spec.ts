import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { patchExitCode } from './patch-exit-code.ts';

describe('patchExitCode', () => {
  let original: typeof process.exitCode;

  beforeEach(() => {
    original = process.exitCode;
  });

  afterEach(() => {
    process.exitCode = original;
  });

  it('should set `process.exitCode` to 1 when called with 1', () => {
    patchExitCode(1);

    expect(process.exitCode).toBe(1);
  });

  it('should set `process.exitCode` to 0 when called with 0 after 1', () => {
    patchExitCode(1);
    patchExitCode(0);

    expect(process.exitCode).toBe(0);
  });

  it('should set `process.exitCode` to 42 when called with 42', () => {
    patchExitCode(42);

    expect(process.exitCode).toBe(42);
  });

  it('should return `undefined` when called with 0', () => {
    expect(patchExitCode(0)).toBe(undefined);
  });
});

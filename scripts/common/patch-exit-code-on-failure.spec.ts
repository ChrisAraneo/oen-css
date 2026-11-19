import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { patchExitCodeOnFailure } from './patch-exit-code-on-failure.ts';

describe('patchExitCodeOnFailure', () => {
  let original: typeof process.exitCode;

  beforeEach(() => {
    original = process.exitCode;
    process.exitCode = 0;
  });

  afterEach(() => {
    process.exitCode = original;
  });

  it('should set `process.exitCode` to 1 when called with `false`', () => {
    patchExitCodeOnFailure(false);

    expect(process.exitCode).toBe(1);
  });

  it('should leave `process.exitCode` at 0 when called with `true`', () => {
    patchExitCodeOnFailure(true);

    expect(process.exitCode).toBe(0);
  });

  it('should leave `process.exitCode` at 1 when called with `true` after it was set', () => {
    process.exitCode = 1;
    patchExitCodeOnFailure(true);

    expect(process.exitCode).toBe(1);
  });

  it('should return `undefined` when called with `true`', () => {
    expect(patchExitCodeOnFailure(true)).toBe(undefined);
  });
});

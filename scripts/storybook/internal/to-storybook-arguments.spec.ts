import { describe, expect, it } from 'vitest';
import { BUILD_ARGUMENTS, DEV_ARGUMENTS } from '../consts.ts';
import { toStorybookArguments } from './to-storybook-arguments.ts';

describe('toStorybookArguments', () => {
  it('should return the build arguments when called with `true`', () => {
    expect(toStorybookArguments(true)).toEqual(BUILD_ARGUMENTS);
  });

  it('should return the dev arguments when called with `false`', () => {
    expect(toStorybookArguments(false)).toEqual(DEV_ARGUMENTS);
  });

  it('should return arguments containing `build` when called with `true`', () => {
    expect(toStorybookArguments(true)).toContain('build');
  });

  it('should return `dev`, `-p`, and `6006` when called with `false`', () => {
    expect(toStorybookArguments(false)).toEqual(['dev', '-p', '6006']);
  });

  it('should return arguments containing `--output-dir` when called with `true`', () => {
    expect(toStorybookArguments(true)).toContain('--output-dir');
  });
});

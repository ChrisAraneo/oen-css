import type CleanCSS from 'clean-css';
import { describe, expect, it } from 'vitest';
import { toMinifiedStylesheet } from './to-minified-stylesheet.ts';

const output = (
  overrides: Partial<Record<'styles' | 'warnings' | 'errors', unknown>>,
): CleanCSS.Output =>
  ({
    styles: 'body{}',
    warnings: [],
    errors: [],
    ...overrides,
  }) as unknown as CleanCSS.Output;

describe('toMinifiedStylesheet', () => {
  it('should return the css, the warnings, and no issue when clean-css reported no error', () => {
    expect(toMinifiedStylesheet(output({}), 'oen.min.css')).toEqual({
      css: 'body{}',
      warnings: [],
      issue: undefined,
    });
  });

  it('should return the clean-css warnings when clean-css reported one', () => {
    expect(
      toMinifiedStylesheet(
        output({ warnings: ['odd selector'] }),
        'oen.min.css',
      ).warnings,
    ).toEqual(['odd selector']);
  });

  it('should return the clean-css error as an issue when clean-css reported an error', () => {
    expect(
      toMinifiedStylesheet(output({ errors: ['broken'] }), 'oen.min.css').issue,
    ).toBe('clean-css failed on oen.min.css:\nbroken');
  });

  it('should return `undefined` as the issue when clean-css reported only warnings', () => {
    expect(
      toMinifiedStylesheet(output({ warnings: ['odd'] }), 'oen.min.css').issue,
    ).toBe(undefined);
  });

  it('should return an issue naming `other.css` when another file was minified', () => {
    expect(
      toMinifiedStylesheet(output({ errors: ['x'] }), 'other.css').issue,
    ).toContain('other.css');
  });
});

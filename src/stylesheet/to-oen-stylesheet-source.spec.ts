import { describe, expect, it } from 'vitest';
import { formatButtonRadiusRule } from '../controls/format-button-radius-rule.ts';
import { toBulmaConfiguration } from './internal/to-bulma-configuration.ts';
import { toOenStylesheetSource } from './to-oen-stylesheet-source.ts';

describe('toOenStylesheetSource', () => {
  it('should return a source that starts with the Bulma `@use` statement when the source is built', () => {
    expect(
      toOenStylesheetSource().startsWith('@use "pkg:bulma/sass" with ('),
    ).toBe(true);
  });

  it('should return a source that closes the statement before the Oen rules when the source is built', () => {
    expect(toOenStylesheetSource()).toContain('\n);\n');
  });

  it('should return a source that ends with the button radius rule when the source is built', () => {
    expect(
      toOenStylesheetSource().endsWith(`${formatButtonRadiusRule()}\n`),
    ).toBe(true);
  });

  it('should return every configured variable when the source is built', () => {
    const source = toOenStylesheetSource();

    expect(
      toBulmaConfiguration().every((variable) => source.includes(variable)),
    ).toBe(true);
  });

  it('should return each variable indented inside the statement when the source is built', () => {
    expect(toOenStylesheetSource()).toContain('\n  $cssvars-prefix');
  });

  it('should return the variables separated by commas when the source is built', () => {
    expect(toOenStylesheetSource()).toContain(',\n  ');
  });

  it('should return the `$cssvars-prefix` set to the oen prefix when the source is built', () => {
    expect(toOenStylesheetSource()).toContain('$cssvars-prefix: "oen-"');
  });
});

import { describe, expect, it } from 'vitest';
import { formatButtonBorderRules } from '../controls/format-button-border-rules.ts';
import { formatButtonGlassRules } from '../controls/format-button-glass-rules.ts';
import { formatButtonLabelRule } from '../controls/format-button-label-rule.ts';
import { formatButtonRadiusRule } from '../controls/format-button-radius-rule.ts';
import { formatButtonShadowRules } from '../controls/format-button-shadow-rules.ts';
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

  it('should return a source that carries the button radius rule when the source is built', () => {
    expect(toOenStylesheetSource()).toContain(`${formatButtonRadiusRule()}\n`);
  });

  it('should return a source that carries the button border rules when the source is built', () => {
    expect(toOenStylesheetSource()).toContain(`${formatButtonBorderRules()}\n`);
  });

  it('should return a source that carries the button glass rules when the source is built', () => {
    expect(toOenStylesheetSource()).toContain(`${formatButtonGlassRules()}\n`);
  });

  it('should return a source that carries the button shadow rule when the source is built', () => {
    expect(toOenStylesheetSource()).toContain(`${formatButtonShadowRules()}\n`);
  });

  it('should return a source that ends with the button label rule when the source is built', () => {
    expect(
      toOenStylesheetSource().endsWith(`${formatButtonLabelRule()}\n`),
    ).toBe(true);
  });

  it('should return the five Oen rules in append order when the source is built', () => {
    const source = toOenStylesheetSource();

    expect(source.indexOf(formatButtonRadiusRule())).toBeLessThan(
      source.indexOf(formatButtonBorderRules()),
    );
    expect(source.indexOf(formatButtonBorderRules())).toBeLessThan(
      source.indexOf(formatButtonGlassRules()),
    );
    expect(source.indexOf(formatButtonGlassRules())).toBeLessThan(
      source.indexOf(formatButtonShadowRules()),
    );
    expect(source.indexOf(formatButtonShadowRules())).toBeLessThan(
      source.indexOf(formatButtonLabelRule()),
    );
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

import { describe, expect, it } from 'vitest';
import { toColorConfiguration } from '../../colors/to-color-configuration.ts';
import { toControlConfiguration } from '../../controls/to-control-configuration.ts';
import { toFontConfiguration } from '../../fonts/to-font-configuration.ts';
import { toNamespaceConfiguration } from '../../namespace/to-namespace-configuration.ts';
import { toTypographyConfiguration } from '../../typography/to-typography-configuration.ts';
import { toBulmaConfiguration } from './to-bulma-configuration.ts';

describe('toBulmaConfiguration', () => {
  it('should return the namespace, font, color, typography, and control variables in order when the configuration is built', () => {
    expect(toBulmaConfiguration()).toEqual([
      ...toNamespaceConfiguration(),
      ...toFontConfiguration(),
      ...toColorConfiguration(),
      ...toTypographyConfiguration(),
      ...toControlConfiguration(),
    ]);
  });

  it('should return the namespace prefix first when the configuration is built', () => {
    expect(toBulmaConfiguration().at(0)).toContain('$cssvars-prefix');
  });

  it('should return every variable starting with the `$` sigil when the configuration is built', () => {
    expect(
      toBulmaConfiguration().every((variable) => variable.startsWith('$')),
    ).toBe(true);
  });

  it('should return each variable name once when the configuration is built', () => {
    const names = toBulmaConfiguration().map(
      (variable) => variable.split(':')[0],
    );

    expect(new Set(names).size).toBe(names.length);
  });
});

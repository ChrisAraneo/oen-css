import { toColorConfiguration } from '../../colors/to-color-configuration.ts';
import { toControlConfiguration } from '../../controls/to-control-configuration.ts';
import { toFontConfiguration } from '../../fonts/to-font-configuration.ts';
import { toNamespaceConfiguration } from '../../namespace/to-namespace-configuration.ts';
import { toTypographyConfiguration } from '../../typography/to-typography-configuration.ts';

export const toBulmaConfiguration = (): readonly string[] => [
  ...toNamespaceConfiguration(),
  ...toFontConfiguration(),
  ...toColorConfiguration(),
  ...toTypographyConfiguration(),
  ...toControlConfiguration(),
];

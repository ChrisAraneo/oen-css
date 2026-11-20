import { describe, expect, it } from 'vitest';
import { OEN_CONTROL_DECLARATIONS } from './consts.ts';
import { toControlConfiguration } from './to-control-configuration.ts';

describe('toControlConfiguration', () => {
  it('should return one Sass variable per control declaration when the configuration is built', () => {
    expect(toControlConfiguration()).toHaveLength(
      OEN_CONTROL_DECLARATIONS.length,
    );
  });

  it('should return each declaration as a Sass variable assignment when the configuration is built', () => {
    expect(toControlConfiguration()).toEqual(
      OEN_CONTROL_DECLARATIONS.map(
        ({ property, value }) => `$${property}: ${value}`,
      ),
    );
  });

  it('should return `$control-line-height` without a unit when the configuration is built', () => {
    expect(toControlConfiguration()).toContainEqual(
      expect.stringMatching(/^\$control-line-height: [\d.]+$/),
    );
  });

  it('should return both button paddings in em when the configuration is built', () => {
    expect(
      toControlConfiguration().filter((variable) =>
        /^\$button-padding-(vertical|horizontal): [\d.]+em$/.test(variable),
      ),
    ).toHaveLength(2);
  });

  it('should return every variable starting with the `$` sigil when the configuration is built', () => {
    expect(
      toControlConfiguration().every((variable) => variable.startsWith('$')),
    ).toBe(true);
  });
});

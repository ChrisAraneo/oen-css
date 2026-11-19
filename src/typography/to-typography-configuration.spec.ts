import { describe, expect, it } from 'vitest';
import { OEN_TYPE_VARIABLES } from './consts.ts';
import { toTypographyConfiguration } from './to-typography-configuration.ts';

describe('toTypographyConfiguration', () => {
  it('should return one Sass variable per configured type variable when the configuration is built', () => {
    expect(toTypographyConfiguration()).toHaveLength(OEN_TYPE_VARIABLES.length);
  });

  it('should return each declaration as a Sass variable assignment when the configuration is built', () => {
    expect(toTypographyConfiguration()).toEqual(
      OEN_TYPE_VARIABLES.map(({ property, value }) => `$${property}: ${value}`),
    );
  });

  it('should return the seven scale steps in rem when the configuration is built', () => {
    expect(
      toTypographyConfiguration().filter((variable) =>
        /^\$size-[1-7]: [\d.]+rem$/.test(variable),
      ),
    ).toHaveLength(7);
  });

  it('should return the body font size and line height when the configuration is built', () => {
    expect(toTypographyConfiguration()).toContainEqual(
      expect.stringMatching(/^\$body-font-size: [\d.]+em$/),
    );
    expect(toTypographyConfiguration()).toContainEqual(
      expect.stringMatching(/^\$body-line-height: [\d.]+$/),
    );
  });

  it('should not return `$size-normal` when the configuration is built', () => {
    expect(
      toTypographyConfiguration().some((variable) =>
        variable.startsWith('$size-normal'),
      ),
    ).toBe(false);
  });
});

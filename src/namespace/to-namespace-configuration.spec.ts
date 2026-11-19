import { describe, expect, it } from 'vitest';
import { toNamespaceConfiguration } from './to-namespace-configuration.ts';

describe('toNamespaceConfiguration', () => {
  it('should return the `$cssvars-prefix` variable first when the configuration is built', () => {
    expect(toNamespaceConfiguration().at(0)).toBe('$cssvars-prefix: "oen-"');
  });

  it('should return an empty `$class-prefix` when the configuration is built', () => {
    expect(toNamespaceConfiguration()).toContain('$class-prefix: ""');
  });

  it("should return Bulma's helper prefixes when the configuration is built", () => {
    expect(toNamespaceConfiguration()).toContain('$helpers-prefix: "is-"');
    expect(toNamespaceConfiguration()).toContain('$helpers-has-prefix: "has-"');
  });

  it('should return `$variables-host: ":root"` when the configuration is built', () => {
    expect(toNamespaceConfiguration()).toContain('$variables-host: ":root"');
  });

  it('should return five variables when the configuration is built', () => {
    expect(toNamespaceConfiguration()).toHaveLength(5);
  });
});

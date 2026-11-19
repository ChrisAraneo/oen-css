import { describe, expect, it } from 'vitest';
import { toIndentedVariables } from './to-indented-variables.ts';

describe('toIndentedVariables', () => {
  it('should return every variable indented by two spaces when called with two', () => {
    expect(toIndentedVariables(['$a: 1', '$b: 2'])).toEqual([
      '  $a: 1',
      '  $b: 2',
    ]);
  });

  it('should return an empty array when called with no variable', () => {
    expect(toIndentedVariables([])).toEqual([]);
  });

  it('should return four spaces of indentation when the variable already has two', () => {
    expect(toIndentedVariables(['  $a: 1'])).toEqual(['    $a: 1']);
  });

  it('should return the variable text unchanged when it is indented', () => {
    expect(toIndentedVariables(['$cssvars-prefix: "oen-"'])).toEqual([
      '  $cssvars-prefix: "oen-"',
    ]);
  });
});

import { describe, expect, it } from 'vitest';
import { toDeclaredCustomProperties } from './to-declared-custom-properties.ts';

describe('toDeclaredCustomProperties', () => {
  it('should return both properties when the stylesheet declares two', () => {
    expect(
      toDeclaredCustomProperties(':root{--oen-primary: red;--oen-link: blue}'),
    ).toEqual(['--oen-primary', '--oen-link']);
  });

  it('should return the property when there is no space before the colon', () => {
    expect(toDeclaredCustomProperties('--oen-primary:red')).toEqual([
      '--oen-primary',
    ]);
  });

  it('should return an empty array when the property is only read', () => {
    expect(
      toDeclaredCustomProperties('.button{color:var(--oen-primary)}'),
    ).toEqual([]);
  });

  it('should return the property once when it is declared twice', () => {
    expect(
      toDeclaredCustomProperties('--oen-primary: red;--oen-primary: blue'),
    ).toEqual(['--oen-primary']);
  });

  it('should return an empty array when the property is in the bulma namespace', () => {
    expect(toDeclaredCustomProperties('--bulma-primary: red')).toEqual([]);
  });

  it('should return an empty array when the stylesheet is empty', () => {
    expect(toDeclaredCustomProperties('')).toEqual([]);
  });

  it('should return the whole name when the property name has several parts', () => {
    expect(toDeclaredCustomProperties('--oen-body-line-height: 1.4')).toEqual([
      '--oen-body-line-height',
    ]);
  });
});

import { describe, expect, it } from 'vitest';
import { hasClassDeclaration } from './has-class-declaration.ts';

describe('hasClassDeclaration', () => {
  it('should return `true` when the class opens a rule', () => {
    expect(hasClassDeclaration('.button{color:red}', 'button')).toBe(true);
  });

  it('should return `true` when the class is in a selector list', () => {
    expect(hasClassDeclaration('.button,.input{color:red}', 'button')).toBe(
      true,
    );
  });

  it('should return `true` when the class is followed by a pseudo class', () => {
    expect(hasClassDeclaration('.button:hover{}', 'button')).toBe(true);
  });

  it('should return `true` when the class is combined with another', () => {
    expect(hasClassDeclaration('.button.is-primary{}', 'button')).toBe(true);
  });

  it('should return `true` when the class heads a descendant or child selector', () => {
    expect(hasClassDeclaration('.navbar .button{}', 'navbar')).toBe(true);
    expect(hasClassDeclaration('.navbar>.button{}', 'navbar')).toBe(true);
  });

  it('should return `false` when only a longer class name is declared', () => {
    expect(hasClassDeclaration('.button-group{}', 'button')).toBe(false);
  });

  it('should return `false` when the stylesheet never declares the class', () => {
    expect(hasClassDeclaration('body{margin:0}', 'button')).toBe(false);
  });

  it('should return `false` when the stylesheet is empty', () => {
    expect(hasClassDeclaration('', 'button')).toBe(false);
  });
});

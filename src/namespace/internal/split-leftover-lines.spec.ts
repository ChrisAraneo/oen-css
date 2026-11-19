import { describe, expect, it } from 'vitest';
import { splitLeftoverLines } from './split-leftover-lines.ts';

describe('splitLeftoverLines', () => {
  it('should return each line numbered from one when the css has two lines', () => {
    expect(
      splitLeftoverLines({ css: 'a{}\nb{}', fileName: 'oen.css' }),
    ).toEqual({
      fileName: 'oen.css',
      lines: [
        { line: 'a{}', number: 1 },
        { line: 'b{}', number: 2 },
      ],
    });
  });

  it('should return the line trimmed when it is padded with spaces', () => {
    expect(
      splitLeftoverLines({ css: '  a{}  ', fileName: 'oen.css' }).lines,
    ).toEqual([{ line: 'a{}', number: 1 }]);
  });

  it('should return the same file name when called with it', () => {
    expect(
      splitLeftoverLines({ css: 'a{}', fileName: 'oen.min.css' }).fileName,
    ).toBe('oen.min.css');
  });

  it('should return a blank first line when the css starts with the banner', () => {
    expect(
      splitLeftoverLines({
        css: '/*! built from Bulma */\n--bulma-a: 1;',
        fileName: 'oen.css',
      }).lines,
    ).toEqual([
      { line: '', number: 1 },
      { line: '--bulma-a: 1;', number: 2 },
    ]);
  });

  it('should return line number 4 when the leftover follows a three-line banner', () => {
    expect(
      splitLeftoverLines({
        css: '/*!\n * Bulma\n */\n--bulma-a: 1;',
        fileName: 'oen.css',
      }).lines.at(-1),
    ).toEqual({ line: '--bulma-a: 1;', number: 4 });
  });

  it('should return one empty line when the css is empty', () => {
    expect(splitLeftoverLines({ css: '', fileName: 'oen.css' }).lines).toEqual([
      { line: '', number: 1 },
    ]);
  });
});

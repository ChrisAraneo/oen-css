import { compileString } from 'sass';
import { describe, expect, it, vi } from 'vitest';
import { toOenStylesheetSource } from '../../../src/stylesheet/to-oen-stylesheet-source.ts';
import { readCompiledOenStylesheet } from './read-compiled-oen-stylesheet.ts';

vi.mock('sass', () => ({
  compileString: vi.fn(),
  NodePackageImporter: vi.fn(),
}));

describe('readCompiledOenStylesheet', () => {
  it('should return the compiled css and no issue when the compile succeeds', () => {
    vi.mocked(compileString).mockReturnValue({ css: '--oen-a: 1;' } as never);

    expect(readCompiledOenStylesheet()).toEqual({
      css: '--oen-a: 1;',
      issue: undefined,
    });
  });

  it('should pass the generated source to `compileString` when the stylesheet is compiled', () => {
    vi.mocked(compileString).mockReturnValue({ css: '' } as never);
    readCompiledOenStylesheet();

    expect(compileString).toHaveBeenCalledWith(
      toOenStylesheetSource(),
      expect.anything(),
    );
  });

  it('should pass `expanded` and no source map to `compileString` when the stylesheet is compiled', () => {
    vi.mocked(compileString).mockReturnValue({ css: '' } as never);
    readCompiledOenStylesheet();

    expect(compileString).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ style: 'expanded', sourceMap: false }),
    );
  });

  it('should return the compile error as an issue when `compileString` throws', () => {
    vi.mocked(compileString).mockImplementation(() => {
      throw new Error('undefined variable');
    });

    expect(readCompiledOenStylesheet()).toEqual({
      css: '',
      issue: 'undefined variable',
    });
  });

  it('should return an empty string as the css when `compileString` throws', () => {
    vi.mocked(compileString).mockImplementation(() => {
      throw new Error('boom');
    });

    expect(readCompiledOenStylesheet().css).toBe('');
  });
});

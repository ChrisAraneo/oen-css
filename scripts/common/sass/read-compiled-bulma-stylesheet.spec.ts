import { compileString } from 'sass';
import { describe, expect, it, vi } from 'vitest';
import { readCompiledBulmaStylesheet } from './read-compiled-bulma-stylesheet.ts';

vi.mock('sass', () => ({
  compileString: vi.fn(),
  NodePackageImporter: vi.fn(),
}));

describe('readCompiledBulmaStylesheet', () => {
  it('should return the compiled css and no issue when the compile succeeds', () => {
    vi.mocked(compileString).mockReturnValue({ css: 'body {}' } as never);

    expect(readCompiledBulmaStylesheet()).toEqual({
      css: 'body {}',
      issue: undefined,
    });
  });

  it('should pass the unconfigured Bulma source to `compileString` when the stylesheet is compiled', () => {
    vi.mocked(compileString).mockReturnValue({ css: '' } as never);
    readCompiledBulmaStylesheet();

    expect(compileString).toHaveBeenCalledWith(
      '@use "pkg:bulma/sass";',
      expect.anything(),
    );
  });

  it('should pass `expanded` and `quietDeps` to `compileString` when the stylesheet is compiled', () => {
    vi.mocked(compileString).mockReturnValue({ css: '' } as never);
    readCompiledBulmaStylesheet();

    expect(compileString).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ style: 'expanded', quietDeps: true }),
    );
  });

  it('should return the compile error as an issue when `compileString` throws', () => {
    vi.mocked(compileString).mockImplementation(() => {
      throw new Error("Can't find stylesheet to import");
    });

    expect(readCompiledBulmaStylesheet()).toEqual({
      css: '',
      issue: "Can't find stylesheet to import",
    });
  });

  it('should return an empty string as the css when `compileString` throws', () => {
    vi.mocked(compileString).mockImplementation(() => {
      throw new Error('boom');
    });

    expect(readCompiledBulmaStylesheet().css).toBe('');
  });
});

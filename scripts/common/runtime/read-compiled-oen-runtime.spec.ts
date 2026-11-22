import { describe, expect, it } from 'vitest';
import { OEN_BUTTON_CANVAS_CLASS } from '../../../src/canvas/consts.ts';
import { readCompiledOenRuntime } from './read-compiled-oen-runtime.ts';

describe('readCompiledOenRuntime', () => {
  it('should return no issue when the runtime compiles', () => {
    expect(readCompiledOenRuntime().issue).toBe(undefined);
  });

  it('should return code that names the canvas class when the runtime compiles', () => {
    expect(readCompiledOenRuntime().code).toContain(OEN_BUTTON_CANVAS_CLASS);
  });

  it('should return minified code that names the canvas class when the runtime compiles', () => {
    expect(readCompiledOenRuntime().minifiedCode).toContain(
      OEN_BUTTON_CANVAS_CLASS,
    );
  });

  it('should return minified code that is smaller than the expanded code when the runtime compiles', () => {
    const { code, minifiedCode } = readCompiledOenRuntime();

    expect(minifiedCode.length).toBeLessThan(code.length);
  });

  it('should return an immediately invoked bundle when the runtime compiles', () => {
    expect(readCompiledOenRuntime().minifiedCode).toContain('(()=>{');
  });
});

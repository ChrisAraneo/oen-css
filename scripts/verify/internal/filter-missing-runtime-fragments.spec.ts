import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_CANVAS_CLASS,
  OEN_BUTTON_CANVAS_HOST_SELECTOR,
} from '../../../src/canvas/consts.ts';
import { filterMissingRuntimeFragments } from './filter-missing-runtime-fragments.ts';

const COMPLETE_RUNTIME = `"${OEN_BUTTON_CANVAS_CLASS}" "${OEN_BUTTON_CANVAS_HOST_SELECTOR}"`;

describe('filterMissingRuntimeFragments', () => {
  it('should return no fragments when the code names the class and the host selector', () => {
    expect(filterMissingRuntimeFragments(COMPLETE_RUNTIME)).toEqual([]);
  });

  it('should return the class when the code names only the host selector', () => {
    expect(
      filterMissingRuntimeFragments(`"${OEN_BUTTON_CANVAS_HOST_SELECTOR}"`),
    ).toEqual([OEN_BUTTON_CANVAS_CLASS]);
  });

  it('should return the host selector when the code names only the class', () => {
    expect(
      filterMissingRuntimeFragments(`"${OEN_BUTTON_CANVAS_CLASS}"`),
    ).toEqual([OEN_BUTTON_CANVAS_HOST_SELECTOR]);
  });

  it('should return both fragments when the code is an empty string', () => {
    expect(filterMissingRuntimeFragments('')).toEqual([
      OEN_BUTTON_CANVAS_CLASS,
      OEN_BUTTON_CANVAS_HOST_SELECTOR,
    ]);
  });
});

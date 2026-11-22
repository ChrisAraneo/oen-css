import { filter, includes } from 'lodash-es';
import {
  OEN_BUTTON_CANVAS_CLASS,
  OEN_BUTTON_CANVAS_HOST_SELECTOR,
} from '../../../src/canvas/consts.ts';

const REQUIRED_RUNTIME_FRAGMENTS: readonly string[] = Object.freeze([
  OEN_BUTTON_CANVAS_CLASS,
  OEN_BUTTON_CANVAS_HOST_SELECTOR,
]);

export const filterMissingRuntimeFragments = (
  code: string,
): readonly string[] =>
  filter(REQUIRED_RUNTIME_FRAGMENTS, (fragment) => !includes(code, fragment));

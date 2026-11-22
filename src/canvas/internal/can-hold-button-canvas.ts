import { includes, toUpper } from 'lodash-es';
import { OEN_BUTTON_CANVAS_VOID_TAG_NAMES } from '../consts.ts';

export const canHoldButtonCanvas = (tagName: string): boolean =>
  !includes(OEN_BUTTON_CANVAS_VOID_TAG_NAMES, toUpper(tagName));

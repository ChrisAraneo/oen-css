import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_CANVAS_HIDDEN_ATTRIBUTE,
  OEN_BUTTON_METAL_HOST_STYLE,
} from '../consts.ts';

export const createButtonMetalHost = (document: Document): HTMLElement =>
  pipe(
    document.createElement('div'),
    (host) =>
      runEffect(host, () =>
        host.setAttribute(OEN_BUTTON_CANVAS_HIDDEN_ATTRIBUTE, 'true'),
      ),
    (host) =>
      runEffect(host, () => (host.style.cssText = OEN_BUTTON_METAL_HOST_STYLE)),
    (host) => runEffect(host, () => document.body.append(host)),
  );

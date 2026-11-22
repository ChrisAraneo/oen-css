import { ShaderMount, liquidMetalFragmentShader } from '@paper-design/shaders';
import { tryCatch } from 'ramda';
import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_METAL_CONTEXT_ATTRIBUTES,
  OEN_BUTTON_METAL_FRAME,
  OEN_BUTTON_METAL_MAX_PIXELS,
  OEN_BUTTON_METAL_PIXEL_RATIO,
  OEN_BUTTON_METAL_STILL_SPEED,
} from '../consts.ts';
import type { BrowserView } from '../types/browser-view.ts';
import { createButtonMetalHost } from './create-button-metal-host.ts';
import { toButtonMetalUniforms } from './to-button-metal-uniforms.ts';

const mountButtonMetal = (host: HTMLElement): ShaderMount =>
  new ShaderMount(
    host,
    liquidMetalFragmentShader,
    toButtonMetalUniforms(),
    OEN_BUTTON_METAL_CONTEXT_ATTRIBUTES,
    OEN_BUTTON_METAL_STILL_SPEED,
    OEN_BUTTON_METAL_FRAME,
    OEN_BUTTON_METAL_PIXEL_RATIO,
    OEN_BUTTON_METAL_MAX_PIXELS,
  );

const removeButtonMetalHost = (host: HTMLElement): undefined =>
  runEffect(undefined, () => host.remove());

export const startButtonMetal = (view: BrowserView): ShaderMount | undefined =>
  pipe(createButtonMetalHost(view.document), (host) =>
    pipe(
      tryCatch(
        (): ShaderMount | undefined => mountButtonMetal(host),
        (): ShaderMount | undefined => removeButtonMetalHost(host),
      ),
      (start) => start(),
    ),
  );

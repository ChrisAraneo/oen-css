import type { ButtonGradientLayer } from './types/button-gradient-layer.ts';
import type { ButtonGradientRampStop } from './types/button-gradient-ramp-stop.ts';
import type { ButtonGradientStop } from './types/button-gradient-stop.ts';

export const OEN_BUTTON_CANVAS_CLASS = 'oen-button-canvas';

export const OEN_BUTTON_CANVAS_SELECTOR: string = `canvas.${OEN_BUTTON_CANVAS_CLASS}`;

export const OEN_BUTTON_CANVAS_CHILD_SELECTOR: string = `:scope > ${OEN_BUTTON_CANVAS_SELECTOR}`;

export const OEN_BUTTON_CANVAS_HOST_SELECTOR =
  '.button:where(:not(.is-ghost, .is-text))';

export const OEN_BUTTON_CANVAS_Z_INDEX = -1;

export const OEN_BUTTON_CANVAS_OPACITY: number = 1;

export const OEN_BUTTON_CANVAS_BLEND_MODE = 'normal';

export const OEN_BUTTON_CANVAS_HIDDEN_ATTRIBUTE = 'aria-hidden';

export const OEN_BUTTON_CANVAS_OFFSET_ATTRIBUTE = 'data-oen-button-offset';

export const OEN_BUTTON_CANVAS_MOUNT_EVENT = 'oen:button-canvas-mount';

export const OEN_BUTTON_CANVAS_RESIZE_EVENT = 'oen:button-canvas-resize';

export const OEN_BUTTON_CANVAS_MIN_PIXEL_RATIO = 1;

export const OEN_BUTTON_CANVAS_MAX_PIXEL_RATIO = 2;

export const OEN_BUTTON_CANVAS_MIN_PIXELS = 1;

export const OEN_BUTTON_CANVAS_MAX_PIXELS = 16384;

export const OEN_BUTTON_CANVAS_VOID_TAG_NAMES: readonly string[] =
  Object.freeze(['INPUT']);

export const OEN_BUTTON_CANVAS_HOST_MUTATIONS: Readonly<MutationObserverInit> =
  Object.freeze({ childList: true, subtree: true });

export const OEN_BUTTON_CANVAS_CONTEXT = '2d';

export const OEN_BUTTON_CANVAS_REPLACE_OPERATION = 'copy';

export const OEN_BUTTON_CANVAS_STACK_OPERATION = 'source-over';

export const OEN_BUTTON_CANVAS_ORIGIN = 0;

export const OEN_BUTTON_GRADIENT_SOURCE_WIDTH = 256;

export const OEN_BUTTON_GRADIENT_SOURCE_HEIGHT = 128;

export const OEN_BUTTON_GRADIENT_PERCENT = 100;

export const OEN_BUTTON_GRADIENT_SPREAD = 105;

export const OEN_BUTTON_GRADIENT_SHIFT = 14;

export const OEN_BUTTON_GRADIENT_SATURATION_BOOST = 75;

export const OEN_BUTTON_GRADIENT_TINT_ALPHA: number = 0.58;

export const OEN_BUTTON_GRADIENT_OPACITY: number = 0.5;

export const OEN_BUTTON_GRADIENT_FULL_ALPHA = 1;

export const OEN_BUTTON_GRADIENT_DURATION = 10000;

export const OEN_BUTTON_GRADIENT_CYCLE = 1;

export const OEN_BUTTON_GRADIENT_FIRST_OFFSET = 0;

export const OEN_BUTTON_GRADIENT_FIRST_STEP = 0;

export const OEN_BUTTON_GRADIENT_OFFSET_STEPS = 16;

export const OEN_BUTTON_GRADIENT_DRIFT_LEFT = 6;

export const OEN_BUTTON_GRADIENT_DRIFT_TOP = 5;

export const OEN_BUTTON_GRADIENT_TURN = 1;

export const OEN_BUTTON_GRADIENT_ZOOM_FROM: number = 1;

export const OEN_BUTTON_GRADIENT_ZOOM_TO: number = 1.15;

export const OEN_BUTTON_GRADIENT_STILL_PHASE = 0;

export const OEN_BUTTON_GRADIENT_STILL_QUERY =
  '(prefers-reduced-motion: reduce)';

export const OEN_BUTTON_GRADIENT_STOPS: readonly ButtonGradientStop[] =
  Object.freeze([
    { direction: 'lighter', limit: 93 },
    { direction: 'darker', limit: 8 },
  ]);

export const OEN_BUTTON_GRADIENT_LAYERS: readonly ButtonGradientLayer[] =
  Object.freeze([
    {
      lightnessOffset: 34,
      radiusWidth: 86,
      radiusHeight: 112,
      positionLeft: 20,
      positionTop: 26,
      falloff: 72,
    },
    {
      lightnessOffset: -28,
      radiusWidth: 100,
      radiusHeight: 126,
      positionLeft: 74,
      positionTop: 20,
      falloff: 72,
    },
    {
      lightnessOffset: 20,
      radiusWidth: 110,
      radiusHeight: 100,
      positionLeft: 70,
      positionTop: 80,
      falloff: 72,
    },
    {
      lightnessOffset: -39,
      radiusWidth: 96,
      radiusHeight: 116,
      positionLeft: 16,
      positionTop: 74,
      falloff: 72,
    },
    {
      lightnessOffset: 59,
      radiusWidth: 38,
      radiusHeight: 46,
      positionLeft: 50,
      positionTop: 8,
      falloff: 62,
    },
    {
      lightnessOffset: 50,
      radiusWidth: 43,
      radiusHeight: 38,
      positionLeft: 85,
      positionTop: 60,
      falloff: 62,
    },
  ]);

export const OEN_BUTTON_GRADIENT_RAMP: readonly ButtonGradientRampStop[] =
  Object.freeze([
    { position: 0, alpha: 1 },
    { position: 0.25, alpha: 0.9 },
    { position: 0.5, alpha: 0.62 },
    { position: 0.75, alpha: 0.26 },
    { position: 1, alpha: 0 },
  ]);

export const OEN_BUTTON_PALETTE_DECIMAL_PLACES = 2;

export const OEN_BUTTON_CHANNEL_CEILING = 255;

export const OEN_BUTTON_CHANNEL_COUNT = 3;

export const OEN_BUTTON_HUE_TURN = 360;

export const OEN_BUTTON_HUE_SECTOR = 60;

export const OEN_BUTTON_ACHROMATIC_HUE = 0;

export const OEN_BUTTON_ACHROMATIC_SATURATION = 0;

export const OEN_BUTTON_LIGHTNESS_FLOOR = 0;

export const OEN_BUTTON_LIGHTNESS_CEILING = 100;

export const OEN_BUTTON_SATURATION_CEILING = 100;

export const OEN_BUTTON_METAL_HOST_STYLE =
  'position:fixed;top:0;left:0;width:256px;height:128px;opacity:0;pointer-events:none;';

export const OEN_BUTTON_METAL_BACK_COLOR = '#15171a';

export const OEN_BUTTON_METAL_TINT_COLOR = '#ffffff';

export const OEN_BUTTON_METAL_REPETITION: number = 2.2;

export const OEN_BUTTON_METAL_SOFTNESS: number = 0.3;

export const OEN_BUTTON_METAL_SHIFT_RED: number = 0.3;

export const OEN_BUTTON_METAL_SHIFT_BLUE: number = 0.3;

export const OEN_BUTTON_METAL_DISTORTION: number = 0.1;

export const OEN_BUTTON_METAL_CONTOUR: number = 0.5;

export const OEN_BUTTON_METAL_ANGLE = 0;

export const OEN_BUTTON_METAL_SHAPE = 0;

export const OEN_BUTTON_METAL_IS_IMAGE = false;

export const OEN_BUTTON_METAL_FIT = 0;

export const OEN_BUTTON_METAL_SCALE = 1;

export const OEN_BUTTON_METAL_ROTATION = 0;

export const OEN_BUTTON_METAL_OFFSET: number = 0;

export const OEN_BUTTON_METAL_ORIGIN: number = 0.5;

export const OEN_BUTTON_METAL_WORLD_SIZE = 0;

export const OEN_BUTTON_METAL_SPEED: number = 0.1;

export const OEN_BUTTON_METAL_STILL_SPEED = 0;

export const OEN_BUTTON_METAL_STILL_FRAME = 0;

export const OEN_BUTTON_METAL_SPREAD = 48000;

export const OEN_BUTTON_METAL_FRAME = 0;

export const OEN_BUTTON_METAL_PIXEL_RATIO = 1;

export const OEN_BUTTON_METAL_MAX_PIXELS = 262144;

export const OEN_BUTTON_METAL_CONTEXT_ATTRIBUTES: Readonly<WebGLContextAttributes> =
  Object.freeze({ preserveDrawingBuffer: true });
